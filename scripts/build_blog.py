"""Build the blog from content/blog.json. Run with Python 3; no dependencies."""
from pathlib import Path
import json, re, html, math
ROOT=Path(__file__).resolve().parents[1]
posts=json.loads((ROOT/'content/blog.json').read_text(encoding='utf-8-sig'))
esc=html.escape
base=(ROOT/'proyectos.html').read_text(encoding='utf-8-sig')
header=re.search(r'<header>.*?</header>',base,re.S).group()
footer=re.search(r'<footer>.*?</footer>',base,re.S).group()
def url(p):return 'blog-'+p['slug']+'.html'
def minutes(p):return max(1,math.ceil(len((p['intro']+' '+ ' '.join(' '.join(s.get('paragraphs',[])+s.get('items',[])) for s in p['sections'])).split())/200))
def write(name,title,desc,body,schema=None):
 head=base[:base.index('<body')]
 head=re.sub(r'<title>.*?</title>','<title>'+esc(title)+' | Rvisioon</title>',head)
 head=re.sub(r'<meta name="description"[^>]*>','<meta name="description" content="'+esc(desc,quote=True)+'">',head)
 head=head.replace('<script src="dashboard-demo.js" defer></script>','')
 head=head.replace('</head>','<link rel="stylesheet" href="blog.css?v=2">'+('<script type="application/ld+json">'+json.dumps(schema,ensure_ascii=False).replace('<','\\u003c')+'</script>' if schema else '')+'</head>')
 (ROOT/name).write_text(head+'<body class="inner-page landing blog-page"><a class="skip" href="#contenido">Ir al contenido</a>'+header+'<main id="contenido">'+body+'</main>'+footer+'</body></html>',encoding='utf-8')
def card(p):return f'<article class="note-card"><a href="{url(p)}"><img src="assets/{esc(p["image"])}" alt="{esc(p["alt"])}" loading="lazy"><div><p class="eyebrow">{esc(p["category"])}</p><h2>{esc(p["title"])}</h2><p>{esc(p["description"])}</p><span class="note-more">Leer artículo ↗ <small>{minutes(p)} min de lectura</small></span></div></a></article>'
p=posts[0]
body='<section class="blog-intro"><p class="eyebrow">BLOG / IDEAS PARA TU PROYECTO</p><h1>Otra mirada a la<br><em>experiencia inmobiliaria.</em></h1><p>Guías para presentar mejor tu proyecto, comprender sus herramientas digitales y preparar el siguiente paso.</p></section>'
body+=f'<section class="featured-note"><a class="featured-image" href="{url(p)}"><img src="assets/{p["image"]}" alt="{esc(p["alt"])}"></a><div><p class="eyebrow">PARA EMPEZAR / {esc(p["category"])}</p><h2><a href="{url(p)}">{esc(p["title"])}</a></h2><p>{esc(p["description"])}</p><a class="text-link" href="{url(p)}">Leer artículo ↗</a><span class="reading-time">{minutes(p)} min de lectura</span></div></section>'
body+='<section class="blog-library"><p class="eyebrow">SIGUE EXPLORANDO</p><div class="notes-grid">'+''.join(card(p) for p in posts[1:])+'</div></section><section class="landing-close"><p class="eyebrow">DE LA IDEA A LA EXPERIENCIA</p><h2>Ve cómo se traduce<br>en un proyecto real.</h2><p>Recorre los showrooms que desarrollamos para inmobiliarias.</p><a class="cta" href="proyectos.html">Explorar proyectos ↗</a></section>'
write('blog.html','Blog de showrooms virtuales y experiencia inmobiliaria','Guías de Rvisioon sobre showrooms virtuales, dashboard inmobiliario y materiales para presentar tu proyecto.',body)
for p in posts:
 toc=''.join(f'<a href="#{esc(s["id"])}">{esc(s["title"])}</a>' for s in p['sections'])
 text=''
 for s in p['sections']:
  text+=f'<section id="{esc(s["id"])}"><h2>{esc(s["title"])}</h2>'+''.join('<p>'+esc(x)+'</p>' for x in s.get('paragraphs',[]))
  if s.get('items'):text+='<ul>'+''.join('<li>'+esc(x)+'</li>' for x in s['items'])+'</ul>'
  if s.get('link'):text+=f'<a class="text-link" href="{esc(s["link"]["href"])}">{esc(s["link"]["label"])} ↗</a>'
  text+='</section>'
 body=f'<nav class="breadcrumbs" aria-label="Ruta de navegación"><a href="index.html">Rvisioon</a><span>/</span><a href="blog.html">Blog</a><span>/</span><span aria-current="page">{esc(p["category"])}</span></nav><article class="reading"><header class="article-heading"><p class="eyebrow">{esc(p["category"])}</p><h1>{esc(p["title"])}</h1><p class="article-meta">Por el equipo Rvisioon <span>·</span> {minutes(p)} min de lectura</p><p class="article-lead">{esc(p["intro"])}</p></header><figure class="article-image"><img src="assets/{esc(p["image"])}" alt="{esc(p["alt"])}"><figcaption>{esc(p["alt"])} · Rvisioon</figcaption></figure><div class="reading-layout"><aside class="article-index"><p class="eyebrow">EN ESTE ARTÍCULO</p>{toc}<a class="back-blog" href="blog.html">← Volver al blog</a></aside><div class="article-body">{text}<div class="article-next"><p class="eyebrow">HABLEMOS DE TU PROYECTO</p><h2>Convirtamos la información en experiencia.</h2><a class="cta" href="contacto.html">Agendar una presentación ↗</a></div></div></div></article><section class="blog-library"><p class="eyebrow">OTRAS LECTURAS</p><div class="notes-grid">'+''.join(card(x) for x in posts if x!=p)+'</div></section>'
 schema={'@context':'https://schema.org','@type':'BlogPosting','headline':p['title'],'description':p['description'],'inLanguage':'es-PE','author':{'@type':'Organization','name':'Rvisioon'},'publisher':{'@type':'Organization','name':'Rvisioon'},'articleSection':p['category']}
 write(url(p),p['title'],p['description'],body,schema)
print(f'Blog built: {len(posts)} articles')
