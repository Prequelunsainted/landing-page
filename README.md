# Landing page — Lucas Gabriel

Portfólio pessoal de **Lucas Gabriel**, estudante de Ciência da Computação e desenvolvedor full stack.
A página reúne apresentação, habilidades, projetos e um formulário de contato.

**Ver online:** https://prequelunsainted.github.io/landing-page/

## O que tem na página

- **Apresentação** com foto, resumo e números.
- **Habilidades** por área: desenvolvimento, dados, geotecnologias (pacote ArcGIS), IA e ferramentas.
- **Projetos em destaque**, com imagens que vêm direto dos repositórios no GitHub:
  [Titanium Finance](https://github.com/Prequelunsainted/titanium-finance),
  [Gamera](https://github.com/Prequelunsainted/Gamera-Secure-Password-Generator) e
  [Afya Admin](https://github.com/Prequelunsainted/afya-admin).
- **Também no GitHub:** lista e contagem de repositórios lidas da API do GitHub ao abrir a página.
- **Formulário de contato** com validação. Como o site é estático, o envio abre o aplicativo de e-mail
  com a mensagem preenchida (`mailto:`).

## Tecnologias

HTML5, CSS3 e JavaScript puro, sem dependências nem etapa de build. Fontes Outfit e Inter (Google Fonts)
e ícones de linguagens do [Devicon](https://devicon.dev).

## Como rodar localmente

```bash
python -m http.server 8000
# abra http://localhost:8000
```

## Estrutura

```
index.html        # página
style.css         # estilos (tema escuro, roxo e azul)
main.js           # menu, GitHub ao vivo e formulário
assets/
  perfil.jpg      # foto de perfil
  curriculo.pdf   # currículo
  arcgis/         # logos do pacote ArcGIS
```

## Créditos

Os logos do ArcGIS (Map Viewer, Dashboards, Experience Builder e StoryMaps) e suas marcas pertencem à Esri
e são usados aqui apenas para indicar as ferramentas com que o autor trabalha.
