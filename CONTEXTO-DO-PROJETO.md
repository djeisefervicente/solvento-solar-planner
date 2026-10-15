# Contexto do projeto — Solvento Solar Planner

Atualizado em 15/10/2026, na versão 36. Este arquivo serve para continuar o trabalho amanhã (ou com outro Claude) sem perder nada.

## O que é
- Aplicativo web offline (PWA) para planejar painéis fotovoltaicos em telhados, para instalações na Itália.
- Funciona no celular Android, no tablet e no computador.
- A interface está em italiano e português (botão IT/PT).
- É um protótipo, **não é um projeto de engenharia validado**. Estrutura, fixação, recuos e normas locais precisam de verificação profissional.

## Onde está tudo
- **Site publicado:** https://djeisefervicente.github.io/solvento-solar-planner/ (cada envio para o GitHub publica sozinho).
- **Repositório:** github.com/djeisefervicente/solvento-solar-planner (branch `main`).
- **Pasta do projeto:** /mnt/project-files
  - Cópia de trabalho: `index.html`, `sw.js`, `view3d.js`, `vendor/`, `icons/`.
  - `entregas/`: um zip por versão (o mais novo é `solvento_solar_planner_v36.zip`) e imagens de exemplo.
  - `versoes/`: o `index.html` de cada versão (v10 a v36).
  - `kit-criar-apps/`: kit para criar outros apps (projeto separado, para o futuro).
- **Arquivos principais:**
  - `index.html`: o app inteiro (HTML, CSS e JavaScript juntos).
  - `view3d.js` + `vendor/three.min.js`: a vista 3D. A biblioteca three.js tem licença MIT e é gratuita.
  - `sw.js`: funcionamento offline. O nome do cache acompanha a versão (`solvento-v36`).
  - `README.md`: histórico detalhado de cada versão.
  - `SPEC.md` e `CLAUDE.md`: regras do projeto.
  - `tests/check-buttons.js`: verificação dos botões.

## Regras combinadas com o usuário (Djeisefer)
1. **Não excluir, esconder nem mudar de lugar nenhum botão ou função sem perguntar antes.** Só adicionar ou corrigir.
2. Explicações em português do Brasil, simples, passo a passo. O usuário não é programador e o GitHub dele está em português.
3. Fazer mudanças pequenas e testáveis, mantendo o que já funciona.
4. Não inventar medidas a partir da foto: a escala vem de uma distância conhecida (passo ①). A "escala de exemplo" serve só para teste e fica marcada como tal.
5. Antes de mudar o formato dos dados salvos, garantir backup (exportar/importar já existe).
6. Não usar mapas ou imagens de terceiros sem verificar a licença. Nada pago sem aprovação.
7. Publicar no GitHub Pages está autorizado.
8. O usuário prefere trabalhar no chat do projeto. Avisar quando algo precisar do computador dele.

## O que o app faz hoje (versão 36)

**Barra de cima**
- Distribuisci pannelli.
- Esporta immagine PNG.
- Stampa / Salva PDF: relatório de uma página.
- Importa immagine tetto: a imagem é limpa ao importar.
- Rimuovi immagine.

**Lateral**
- Projetos: salvar, novo, abrir, duplicar, excluir, exportar e importar backup.
- Medidas do telhado:
  - Formas: retângulo ou polígono irregular.
  - Distância da borda, espaço entre painéis, obstáculos.
  - Ângulo da grade.
- Modelo do painel: medidas, potência, orientação. Os modelos podem ser salvos.
- Notas do projeto.

**Acima do desenho**
- ▯ Em pé / ▭ Deitados: redistribui os painéis e compara a quantidade nas duas posições.
- 🧊 Vista 3D: telhado de uma água. Inclinação, lado do beiral e altura são manuais. A imagem 3D pode ser salva em PNG.
- ↶ Desfazer.
- ✂ Apagar um pedaço.
- 🧹 Limpar tudo: fica só a imagem.
- Girar e remover o painel selecionado.
- Refazer disposição.

**Passos**
- ① Escala: medida conhecida.
- ② Desenhar o telhado.
- ③ Adicionar painéis: preenche a forma medida e mostra a quantidade e os kWp.

**Ferramentas**
- Painéis, Editar contorno, Fechar contorno, Excluir ponto.
- Obstáculos e Excluir obstáculo.
- 📏 Misura:
  - Aperta, arrasta e solta para fazer cada segmento; a linha para quando você solta.
  - Linhas separadas são unidas automaticamente.
  - Fechando a forma, mostra a área, o comprimento e a largura.
- 🧪 Escala de exemplo: 40 m de largura, só para teste.
- 📐 Perspectiva: com os 4 cantos do telhado marcados e as 2 medidas reais (A→B e B→C), desenha os painéis em perspectiva sobre a foto.
- Ajustar vista.
- Altri strumenti: traçar novo contorno, calibrar escala, calibrar por um lado, alinhar a um lado.

**No desenho**
- Zoom + / − / ajustar, arrastar a imagem e pinça no celular.
- Os painéis com problema ficam em vermelho com ⚠. O aviso tem os botões "🔍 Mostrar onde" e "↻ Redistribuir".
- A grade é alinhada automaticamente ao lado mais comprido do contorno.

**Offline**
- Instala como app.
- Funciona sem internet, inclusive a vista 3D.

## Histórico de versões (resumo; detalhes no README.md)

| Versão | O que mudou |
|---|---|
| v2 | Base: telhado retangular e projetos salvos |
| v3 | Telhado irregular, calibração da escala e backup |
| v4 | Obstáculos, grade alinhada e offline (PWA) |
| v5 | Acabamentos e relatório PDF |
| v6 | Uso no dia a dia: desfazer, zoom, etc. |
| v7 | Primeiro ver o telhado: imagem limpa |
| v8 | Medir na foto em 3 passos |
| v9 | Visual novo |
| v10 | Botões de zoom |
| v11 | Medição com vários pontos |
| v12 | Vista 3D |
| v13 | Medir arrastando |
| v14 | Segmentos com aperta-arrasta-solta |
| v15 | Painéis dentro da medição |
| v16 | ③ funciona com linhas separadas |
| v17 | Escala primeiro |
| v18 | Limpar tudo |
| v19 | Apagar só um pedaço |
| v20 | A linha para ao soltar |
| v21 | Conferência da escala |
| v22 | Escala de exemplo |
| v23 | Mostrar onde está o problema |
| v24 | Painéis seguem a linha do telhado |
| v25 | Painéis em pé ou deitados |
| v26 | Botões de medição sempre visíveis, mesmo no modo Retângulo (ao clicar, muda para polígono), e verificação de botões antes de publicar |
| v27 | Revisão completa: reimportar a mesma imagem, novo projeto limpo, modelo selecionado após salvar, data no formato certo |
| v28 | 📐 Perspectiva: painéis desenhados em perspectiva sobre fotos inclinadas |
| v29 | Perspectiva automática no ③ quando o telhado tem 4 cantos; painéis que saem do telhado são retirados com aviso |
| v30 | Campo "quantos painéis você quer" com aviso do que fica de fora; tocar no painel mostra 🗑 Excluir |
| v31 | Botões ➕ Adicionar em pé / deitado: colocar painel à mão onde tocar |
| v32 | Troca Em pé/Deitados sem estados intermediários no desfazer; novo botão ↷ Refazer |
| v33 | Em pé/Deitados também giram os painéis ➕ adicionados à mão; atualização do app mais confiável |
| v34 | Painéis com aparência real: moldura prateada e células escuras, seguindo a perspectiva |
| v35 | Várias áreas no mesmo telhado: ao desenhar uma nova forma, os painéis anteriores ficam fixos e os totais somam |
| v36 | Tocar numa área fixa a torna ativa e editável (mover, girar, adicionar, excluir, Em pé/Deitados) |

## Limitações conhecidas
- A vista 3D só faz telhado de uma água (sem cumeeira e sem duas águas).
- As medidas na foto dependem da escala dada pela pessoa e são uma estimativa.
- Não há cálculo estrutural, elétrico nem de sombreamento.
- Ainda não foi testado em um celular Android real (instalação, offline e toque).

## Próximos passos
- Em 15/10 o usuário aprovou as versões 34 a 36 e parou por hoje. Perguntar, no começo da próxima conversa, o que ele achou do teste no celular.
- Ideias ainda não escolhidas: telhado de duas águas, estimativa de kWh/ano, lista de material, foto pela câmera, compartilhar o PDF.
- Teste no celular Android real e correção do que aparecer.

## Teste no celular (protótipo para mostrar a clientes)
- Link: https://djeisefervicente.github.io/solvento-solar-planner/
- QR code do link: `entregas/qr-solvento-celular.png`.
- Verificado em 15/10 (v36, celular Android simulado): o Chrome aceita instalar como app, sem erros no manifesto, e o app abre sem internet, inclusive a vista 3D.
- Instalar: abrir o link no Chrome do celular, menu ⋮ → "Instalar app" (ou "Adicionar à tela inicial").
- Os projetos ficam salvos só naquele aparelho. Para levar de um aparelho para outro, use Exportar/Importar backup.

## Como publicar uma nova versão (para o Claude)
1. Alterar `index.html` no repositório. Subir a versão em `sw.js` (`solvento-vN`) e em `appVersion` (it e pt) no `index.html`.
2. Testar: servir a pasta (`python3 -m http.server 8766`) e rodar `node tests/check-buttons.js http://localhost:8766/`. Tem que dar OK em tudo. Rodar também os testes de regressão:
   - retângulo 20×10 m → 63 painéis;
   - projeto v2 → 45;
   - com obstáculo → 57.
3. Adicionar uma seção "Versão N" no topo do histórico do README.md.
4. Fazer o commit como `djeisefervicente` e o push para `main`. Conferir se o deploy do GitHub Actions terminou com sucesso.
5. Copiar os arquivos para /mnt/project-files, salvar `versoes/index-vN.html` e criar `entregas/solvento_solar_planner_vN.zip`.
