#!/bin/bash

g="$(printf '\033[32m')"
y="$(printf '\033[33m')"
r="$(printf '\033[31m')"
c="$(printf '\033[36m')"
m="$(printf '\033[35m')"
b="$(printf '\033[1m')"
x="$(printf '\033[0m')"

now="$(date '+%Y-%m-%d %H:%M:%S')"
now_epoch="$(date +%s)"

# DNS
ns_tld="$(dig +short NS mariogijon.es @a.nic.es 2>/dev/null)"
ns_inf="$(printf '%s\n' "$ns_tld" | grep -c 'infinityfree.com')"
ns_old="$(printf '%s\n' "$ns_tld" | grep -c 'servicio-online')"
ns1="$(dig +short NS mariogijon.es @a.nic.es 2>/dev/null | sed -n '1p')"
ns2="$(dig +short NS mariogijon.es @a.nic.es 2>/dev/null | sed -n '2p')"

# A Records WWW
www_cf="$(dig +short A www.mariogijon.es @1.1.1.1 2>/dev/null | head -1)"
www_go="$(dig +short A www.mariogijon.es @8.8.8.8 2>/dev/null | head -1)"
www_q9="$(dig +short A www.mariogijon.es @9.9.9.9 2>/dev/null | head -1)"
www_ttl="$(dig +noall +answer A www.mariogijon.es @1.1.1.1 2>/dev/null | awk '{print $2}' | head -1)"
www_cn="$(dig +short CNAME www.mariogijon.es @1.1.1.1 2>/dev/null)"

# A Records Apex
apex_cf="$(dig +short A mariogijon.es @1.1.1.1 2>/dev/null | head -1)"
apex_go="$(dig +short A mariogijon.es @8.8.8.8 2>/dev/null | head -1)"
apex_q9="$(dig +short A mariogijon.es @9.9.9.9 2>/dev/null | head -1)"
apex_aa="$(dig +short AAAA mariogijon.es @1.1.1.1 2>/dev/null | head -1)"
apex_ttl="$(dig +noall +answer A mariogijon.es @1.1.1.1 2>/dev/null | awk '{print $2}' | head -1)"

# SOA
soa="$(dig +noall +answer SOA mariogijon.es @ns1.infinityfree.com 2>/dev/null)"
soa_serial="$(printf '%s\n' "$soa" | awk '{print $7}')"
soa_mname="$(printf '%s\n' "$soa" | awk '{print $6}' | sed 's/\.$//')"
soa_refresh="$(printf '%s\n' "$soa" | awk '{print $8}')"
soa_retry="$(printf '%s\n' "$soa" | awk '{print $9}')"
soa_expire="$(printf '%s\n' "$soa" | awk '{print $10}')"

# HTTP/HTTPS
http_code="$(curl -sI http://www.mariogijon.es 2>/dev/null | awk 'NR==1 {print $2}')"
http_srv="$(curl -sI http://www.mariogijon.es 2>/dev/null | grep -i 'server:' | cut -d' ' -f2- | head -1)"
http_time="$(curl -so /dev/null -w '%{time_total}' http://www.mariogijon.es 2>/dev/null)"
http_connect="$(curl -so /dev/null -w '%{time_connect}' http://www.mariogijon.es 2>/dev/null)"

https_code="$(curl -sI https://www.mariogijon.es 2>/dev/null | awk 'NR==1 {print $2}')"
https_time="$(curl -so /dev/null -w '%{time_total}' https://www.mariogijon.es 2>/dev/null)"
https_connect="$(curl -so /dev/null -w '%{time_connect}' https://www.mariogijon.es 2>/dev/null)"
https_ssl="$(curl -sI https://www.mariogijon.es 2>/dev/null | grep -i 'strict-transport-security')"

# Page
page_content="$(curl -s https://www.mariogijon.es 2>/dev/null | head -50)"
page_title="$(printf '%s\n' "$page_content" | sed -n 's/.*<title>\([^<]*\)<\/title>.*/\1/p' | head -1)"
page_size="$(curl -s https://www.mariogijon.es 2>/dev/null | wc -c)"

# Certificate
cert_data="$(echo | openssl s_client -connect www.mariogijon.es:443 -servername www.mariogijon.es 2>/dev/null | openssl x509 2>/dev/null)"
cert_san="$(printf '%s\n' "$cert_data" | openssl x509 -noout -subject 2>/dev/null | grep -o 'CN=[^,]*' | cut -d'=' -f2)"
cert_san_list="$(printf '%s\n' "$cert_data" | openssl x509 -noout -ext subjectAltName 2>/dev/null | tr '\n' ' ')"
cert_issuer="$(printf '%s\n' "$cert_data" | openssl x509 -noout -issuer 2>/dev/null | cut -d'=' -f2- | cut -d',' -f1)"
cert_notbefore="$(printf '%s\n' "$cert_data" | openssl x509 -noout -dates 2>/dev/null | grep notBefore | cut -d'=' -f2)"
cert_notafter="$(printf '%s\n' "$cert_data" | openssl x509 -noout -dates 2>/dev/null | grep notAfter | cut -d'=' -f2)"
if date -j -f "%b %e %T %Y %Z" "$cert_notafter" +%s >/dev/null 2>&1; then
  cert_notafter_epoch="$(date -j -f "%b %e %T %Y %Z" "$cert_notafter" +%s)"
else
  cert_notafter_epoch="$(date -d "$cert_notafter" +%s 2>/dev/null || echo 0)"
fi
cert_days=$(( (cert_notafter_epoch - now_epoch) / 86400 ))

cert_host_ok=0
if printf '%s' "$cert_san_list" | grep -Eq 'DNS:(\*\.)?mariogijon\.es|DNS:www\.mariogijon\.es'; then
  cert_host_ok=1
fi

# DNS Performance
dns_time="$(dig www.mariogijon.es +stats 2>/dev/null | grep 'Query time:' | awk '{print $4}')"

# Helpers de layout: mantienen el separador vertical en la misma columna.
col_w=95
rule='────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────'

strip_ansi() {
  printf '%s' "$1" | sed -E 's/\[[0-9;]*m//g'
}

pad_cell() {
  text="$1"
  width="$2"
  plain="$(strip_ansi "$text")"
  len=${#plain}

  if [ "$len" -gt "$width" ]; then
    printf '%s' "$text"
    return
  fi

  pad=$((width - len))
  printf '%s%*s' "$text" "$pad" ''
}

row2() {
  printf '%s  ' "$b"
  pad_cell "$1" "$col_w"
  printf ' │ '
  pad_cell "$2" "$col_w"
  printf '%s\n' "$x"
}

title() {
  printf '%s%s%s\n' "$b$m" "$1 " "$rule"
}

# HEADER
printf '%s%s\n' "$b$c" "$rule"
row2 "MARIO GIJON CV - INFRAESTRUCTURA EN VIVO" "Actualizado: $now"
printf '%s%s\n\n' "$b$c" "$rule"

# SECTION 1: DNS & NAMESERVERS
title "DNS & NAMESERVERS"
if [ "$ns_inf" -ge 1 ]; then
  left_status="${g}Estado: [OK] InfinityFree activo${x}"
else
  left_status="${r}Estado: [X] Esperando propagacion a InfinityFree${x}"
fi
if [ "$ns_old" -ge 1 ]; then
  right_status="${r}NS antiguos: [X] servicio-online detectado${x}"
else
  right_status="${g}NS antiguos: [OK] no detectados${x}"
fi
row2 "$left_status" "$right_status"
if [ -n "$ns1" ]; then ns1_cell="${g}NS1: $ns1${x}"; else ns1_cell="${r}NS1: --${x}"; fi
if [ -n "$ns2" ]; then ns2_cell="${g}NS2: $ns2${x}"; else ns2_cell="${r}NS2: --${x}"; fi
row2 "$ns1_cell" "$ns2_cell"
printf '\n'

# SECTION 2: WWW A RECORDS
title "REGISTROS A www.mariogijon.es"
for resolver in "Cloudflare (1.1.1.1)=$www_cf" "Google (8.8.8.8)=$www_go" "Quad9 (9.9.9.9)=$www_q9"; do
  name="${resolver%=*}"
  ip="${resolver#*=}"
  if printf '%s' "$ip" | grep -q '185.27.134.149'; then
    mark="${g}[OK] $name: ${ip:---}${x}"
  else
    mark="${r}[X] $name: ${ip:---}${x}"
  fi
  if [ -n "$www_ttl" ]; then
    ttl_cell="${g}TTL: ${www_ttl} seg${x}"
  else
    ttl_cell="${r}TTL: -- seg${x}"
  fi
  row2 "$mark" "$ttl_cell"
done
if [ -n "$www_cn" ]; then
  row2 "${r}CNAME detectado${x}" "${r}$www_cn${x}"
else
  row2 "${g}Sin CNAME detectado${x}" "${g}Correcto para A directo${x}"
fi
printf '\n'

# SECTION 3: APEX A RECORDS
title "REGISTROS A mariogijon.es (APEX)"
if printf '%s' "$apex_cf" | grep -q '185.27.134.149'; then apex_cf_cell="${g}IPv4 Cloudflare: ${apex_cf:---}${x}"; else apex_cf_cell="${r}IPv4 Cloudflare: ${apex_cf:---}${x}"; fi
if [ -n "$apex_ttl" ]; then apex_ttl_cell="${g}TTL: $apex_ttl seg${x}"; else apex_ttl_cell="${r}TTL: -- seg${x}"; fi
if printf '%s' "$apex_go" | grep -q '185.27.134.149'; then apex_go_cell="${g}IPv4 Google: ${apex_go:---}${x}"; else apex_go_cell="${r}IPv4 Google: ${apex_go:---}${x}"; fi
if printf '%s' "$apex_q9" | grep -q '185.27.134.149'; then apex_q9_cell="${g}IPv4 Quad9: ${apex_q9:---}${x}"; else apex_q9_cell="${r}IPv4 Quad9: ${apex_q9:---}${x}"; fi
if [ -n "$apex_aa" ]; then apex_aa_cell="${g}IPv6 Cloudflare: $apex_aa${x}"; else apex_aa_cell="${r}IPv6 Cloudflare: --${x}"; fi
row2 "$apex_cf_cell" "$apex_ttl_cell"
row2 "$apex_go_cell" "$apex_q9_cell"
row2 "$apex_aa_cell" ""
printf '\n'

# SECTION 4: HTTP/HTTPS
title "HTTP / HTTPS STATUS"
if [ "$http_code" = "200" ]; then
  http_status="${g}HTTP: [OK] 200${x}"
else
  http_status="${r}HTTP: [X] ${http_code:---}${x}"
fi
if [ "$https_code" = "200" ]; then
  https_status="${g}HTTPS: [OK] 200${x}"
else
  https_status="${r}HTTPS: [X] ${https_code:---}${x}"
fi
row2 "$http_status" "$https_status"
if [ -n "$https_ssl" ]; then
  hsts_status="${g}HSTS: [OK] habilitado${x}"
else
  hsts_status="${r}HSTS: [X] no configurado${x}"
fi
if [ "$http_code" = "200" ]; then
  server_cell="${g}Servidor: ${http_srv:---}${x}"
  http_time_cell="${g}HTTP total ${http_time:0:6}s | conexion ${http_connect:0:6}s${x}"
else
  server_cell="${r}Servidor: ${http_srv:---}${x}"
  http_time_cell="${r}HTTP total ${http_time:0:6}s | conexion ${http_connect:0:6}s${x}"
fi
if [ "$https_code" = "200" ]; then
  https_time_cell="${g}HTTPS total ${https_time:0:6}s | conexion ${https_connect:0:6}s${x}"
else
  https_time_cell="${r}HTTPS total ${https_time:0:6}s | conexion ${https_connect:0:6}s${x}"
fi
row2 "$server_cell" "$hsts_status"
row2 "$http_time_cell" "$https_time_cell"
printf '\n'

# SECTION 5: CERTIFICATE
title "CERTIFICADO SSL/TLS"
if [ -n "$cert_san" ]; then
  if [ "$cert_host_ok" -eq 1 ]; then
    cert_cn="${g}CN/SAN: [OK] $cert_san${x}"
  else
    cert_cn="${r}CN/SAN: [X] $cert_san (no coincide con mariogijon.es)${x}"
  fi
else
  cert_cn="${r}CN: [X] pendiente${x}"
fi
if [ -n "$page_title" ]; then
  title_status="${g}Titulo: [OK] $page_title${x}"
else
  title_status="${r}Titulo: [X] sin titulo detectado${x}"
fi
row2 "$cert_cn" "$title_status"
if [ -n "$cert_issuer" ]; then cert_issuer_cell="${g}Emisor: ${cert_issuer}${x}"; else cert_issuer_cell="${r}Emisor: --${x}"; fi
if [ "${page_size:-0}" -gt 0 ] 2>/dev/null; then page_size_cell="${g}Tamano del sitio: ${page_size} bytes${x}"; else page_size_cell="${r}Tamano del sitio: ${page_size:---} bytes${x}"; fi
row2 "$cert_issuer_cell" "$page_size_cell"
if [ -n "$cert_notbefore" ]; then
  row2 "${g}Valido desde: $cert_notbefore${x}" "${g}Valido hasta: $cert_notafter${x}"
  if [ "$cert_days" -gt 30 ]; then
    day_status="${g}Dias restantes: [OK] $cert_days${x}"
  else
    day_status="${r}Dias restantes: [X] certificado expirado${x}"
  fi
  row2 "$day_status" ""
else
  row2 "${r}Validez de certificado no disponible${x}" ""
fi
printf '\n'

# SECTION 6: SOA
title "SOA (Start of Authority)"
if [ -n "$soa_mname" ] && [ -n "$soa_serial" ]; then
  row2 "${g}Servidor maestro: ${soa_mname}${x}" "${g}Serial: ${soa_serial}${x}"
else
  row2 "${r}Servidor maestro: ${soa_mname:---}${x}" "${r}Serial: ${soa_serial:---}${x}"
fi
if [ -n "$soa_refresh" ] && [ -n "$soa_retry" ] && [ -n "$soa_expire" ]; then
  row2 "${g}Refresh: ${soa_refresh} seg${x}" "${g}Retry: ${soa_retry} seg | Expire: ${soa_expire} seg${x}"
else
  row2 "${r}Refresh: ${soa_refresh:---} seg${x}" "${r}Retry: ${soa_retry:---} seg | Expire: ${soa_expire:---} seg${x}"
fi
printf '\n'

# SECTION 7: PERFORMANCE
title "PERFORMANCE & DIAGNOSTICS"
if [ -n "$dns_time" ]; then
  row2 "${g}DNS Lookup Time: ${dns_time} ms${x}" ""
else
  row2 "${r}DNS Lookup Time: -- ms${x}" ""
fi
printf '\n'

# SECTION 8: CHECKLIST
title "CHECKLIST DE OPERATIVIDAD"

printf '%s' "$b"
if [ "$ns_inf" -ge 1 ]; then printf '%s[OK]%s %sDNS propagado a InfinityFree nameservers%s\n' "$g" "$x" "$g" "$x"; else printf '%s[X]%s %sDNS propagado a InfinityFree nameservers%s\n' "$r" "$x" "$r" "$x"; fi

printf '%s' "$b"
if printf '%s\n' "$www_cf" | grep -q '185.27.134.149'; then printf '%s[OK]%s %sRegistros A (www) apuntando a 185.27.134.149%s\n' "$g" "$x" "$g" "$x"; else printf '%s[X]%s %sRegistros A (www) apuntando a 185.27.134.149%s\n' "$r" "$x" "$r" "$x"; fi

printf '%s' "$b"
if printf '%s\n' "$apex_cf" | grep -q '185'; then printf '%s[OK]%s %sRegistros A (apex) configurados correctamente%s\n' "$g" "$x" "$g" "$x"; else printf '%s[X]%s %sRegistros A (apex) configurados correctamente%s\n' "$r" "$x" "$r" "$x"; fi

printf '%s' "$b"
if [ "$http_code" = "200" ]; then printf '%s[OK]%s %sHTTP accesible y sirviendo contenido (200)%s\n' "$g" "$x" "$g" "$x"; else printf '%s[X]%s %sHTTP accesible y sirviendo contenido (200)%s\n' "$r" "$x" "$r" "$x"; fi

printf '%s' "$b"
if [ "$https_code" = "200" ]; then printf '%s[OK]%s %sHTTPS accesible y sirviendo contenido (200)%s\n' "$g" "$x" "$g" "$x"; else printf '%s[X]%s %sHTTPS accesible y sirviendo contenido (200)%s\n' "$r" "$x" "$r" "$x"; fi

printf '%s' "$b"
if [ "$cert_host_ok" -eq 1 ] && [ "$cert_days" -gt 0 ]; then printf '%s[OK]%s %sCertificado SSL valido para mariogijon.es y no expirado%s\n' "$g" "$x" "$g" "$x"; else printf '%s[X]%s %sCertificado SSL invalido para mariogijon.es o expirado%s\n' "$r" "$x" "$r" "$x"; fi

printf '%s' "$b"
if [ -n "$page_title" ]; then printf '%s[OK]%s %sSitio sirviendo contenido con titulo HTML correcto%s\n' "$g" "$x" "$g" "$x"; else printf '%s[X]%s %sSitio sirviendo contenido con titulo HTML correcto%s\n' "$r" "$x" "$r" "$x"; fi

printf '%s' "$b"
if [ -n "$https_ssl" ]; then printf '%s[OK]%s %sHSTS (seguridad en transito) habilitado%s\n' "$g" "$x" "$g" "$x"; else printf '%s[X]%s %sHSTS (seguridad en transito) no configurado%s\n' "$r" "$x" "$r" "$x"; fi

printf '\n%s%s\n' "$b$m" "$rule"

if [ "$ns_inf" -ge 1 ] && printf '%s\n' "$www_cf" | grep -q '185.27.134.149' && [ "$http_code" = "200" ] && [ "$https_code" = "200" ] && [ "$cert_host_ok" -eq 1 ] && [ "$cert_days" -gt 0 ] && [ -n "$page_title" ]; then
  printf '%s%s%s\n' "$b$g" "ESTADO FINAL: [OK] Infraestructura operativa al 100%" "$x"
else
  printf '%s%s%s\n' "$b$r" "ESTADO FINAL: [X] Sistema en progreso (DNS / SSL / contenido)" "$x"
fi
printf '\n'
