import fs from 'fs';
import path from 'path';

const projectFile = path.join(process.cwd(), 'src', 'data', 'projects.ts');
const outputFile = path.join(process.cwd(), 'src', 'data', 'projectTranslations.generated.json');
const localeCodes = {
  ENG: 'en',
  CAT: 'ca',
  GLG: 'gl',
  EUS: 'eu',
  FRA: 'fr',
  ITA: 'it',
  DEU: 'de',
  ZHO: 'zh-CN',
  JPN: 'ja',
  RUS: 'ru',
  POL: 'pl'
};
const delimiter = '\n␞\n';

const file = fs.readFileSync(projectFile, 'utf8');
const projectsStart = file.indexOf('export const projects');
if (projectsStart === -1) {
  throw new Error('Cannot find projects array in projects.ts');
}
const eqIndex = file.indexOf('=', projectsStart);
const arrStart = file.indexOf('[', eqIndex);
let depth = 0;
let arrEnd = -1;
for (let i = arrStart; i < file.length; i += 1) {
  const ch = file[i];
  if (ch === '[') depth += 1;
  if (ch === ']') {
    depth -= 1;
    if (depth === 0) {
      arrEnd = i;
      break;
    }
  }
}
if (arrStart === -1 || arrEnd === -1) {
  throw new Error('Could not parse projects array boundaries');
}
const projects = eval(file.slice(arrStart, arrEnd + 1));

const buildEntries = (project) => {
  const entries = [];
  const push = (field, value) => {
    entries.push({ id: project.id, field, value: `${value}`.replace(/\n/g, ' ').trim() });
  };

  push('title', project.title);
  push('summary', project.summary);
  push('role', project.role);
  push('context', project.context);
  push('details.description', project.details.description);
  push('details.problem', project.details.problem);
  push('details.solution', project.details.solution);
  push('details.results', project.details.results);
  (project.details.features || []).forEach((feature) => push('details.features', feature));
  (project.details.tags || []).forEach((tag) => push('details.tags', tag));

  return entries;
};

const allEntries = projects.flatMap(buildEntries);
const chunkSize = 80;
const chunks = [];
for (let i = 0; i < allEntries.length; i += chunkSize) {
  chunks.push(allEntries.slice(i, i + chunkSize));
}

const queryUrl = (texts, target) => {
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  url.searchParams.set('client', 'gtx');
  url.searchParams.set('sl', 'es');
  url.searchParams.set('tl', target);
  url.searchParams.set('dt', 't');
  url.searchParams.set('q', texts.join(delimiter));
  return url.toString();
};

const translateChunk = async (texts, target) => {
  const url = queryUrl(texts, target);
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) {
    throw new Error(`Translation API failed ${res.status}: ${res.statusText}`);
  }
  const json = await res.json();
  const translated = json[0].map((item) => item[0]).join('');
  return translated.split(delimiter).map((line) => line.replace(/\r/g, '').trim());
};

const buildTranslationMap = async () => {
  const translations = {};

  for (const [localeKey, target] of Object.entries(localeCodes)) {
    console.log(`Translating locale ${localeKey} (${target})`);
    const results = [];

    for (let i = 0; i < chunks.length; i += 1) {
      const values = chunks[i].map((entry) => entry.value);
      const translated = await translateChunk(values, target);
      if (translated.length !== values.length) {
        throw new Error(`Expected ${values.length} translations but got ${translated.length}`);
      }
      results.push(...translated);
      console.log(`  chunk ${i + 1} / ${chunks.length} completed`);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    translations[localeKey] = {};
    for (let index = 0; index < allEntries.length; index += 1) {
      const { id, field } = allEntries[index];
      const value = results[index];
      translations[localeKey][id] ??= { details: { description: '', problem: '', solution: '', results: '', features: [], tags: [] } };
      const targetEntry = translations[localeKey][id];

      if (field === 'title') targetEntry.title = value;
      else if (field === 'summary') targetEntry.summary = value;
      else if (field === 'role') targetEntry.role = value;
      else if (field === 'context') targetEntry.context = value;
      else if (field === 'details.description') targetEntry.details.description = value;
      else if (field === 'details.problem') targetEntry.details.problem = value;
      else if (field === 'details.solution') targetEntry.details.solution = value;
      else if (field === 'details.results') targetEntry.details.results = value;
      else if (field === 'details.features') targetEntry.details.features.push(value);
      else if (field === 'details.tags') targetEntry.details.tags.push(value);
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(translations, null, 2), 'utf8');
  console.log(`Wrote ${outputFile}`);
};

buildTranslationMap().catch((error) => {
  console.error(error);
  process.exit(1);
});
