# Solvento Solar Planner

Projeto inicial de um aplicativo para planejamento de instalações fotovoltaicas, iniciado como protótipo HTML independente.

## Objetivo

Ajudar a planejar a instalação de painéis fotovoltaicos: medir e desenhar o telhado, testar a distribuição dos módulos, calcular a quantidade e a potência nominal, e exportar um desenho para uso na obra.

## Como abrir o protótipo

1. Abra `index.html` em um navegador moderno (Chrome, Edge ou Firefox).
2. Para desenvolvimento com Claude Code, abra esta pasta no Claude Code e peça para ele ler primeiro `CLAUDE.md`, `SPEC.md` e `README.md`.
3. O protótipo atual é um HTML independente, sem processo de build nem dependências instaladas.

## Requisitos já decididos

- Nome: **Solvento Solar Planner**.
- Dispositivos-alvo: Android, computador e tablet.
- Idiomas da interface: italiano e português brasileiro.
- Deve funcionar offline para continuar projetos já preparados no dispositivo.
- A intenção é usar imagens aéreas/satélite como referência para desenhar o telhado.
- O utilizador deve poder desenhar telhados retangulares e irregulares.
- A colocação dos painéis deve ser automática, com possibilidade de mover e girar módulos manualmente.
- Biblioteca persistente de modelos de painéis, com possibilidade de cadastrar novos modelos.
- Saídas desejadas: desenho cotado, quantidade de painéis, potência total em kWp, PDF e imagem compartilhável.
- Os projetos devem ser salvos individualmente e reabertos.

## Estado atual do protótipo

O `index.html` é a versão 2 do protótipo. Inclui uma interface de planejamento básica, desenho de telhado retangular por dimensões, distribuição automática inicial, edição manual dos painéis, cadastro/biblioteca local de módulos, cálculo de quantidade e potência, importação de imagem de referência, salvamento e reabertura local de projetos e exportação de imagem/impressão para PDF.

É uma demonstração inicial, não uma ferramenta pronta para uso técnico ou comercial. O armazenamento é local ao navegador/dispositivo e não sincroniza automaticamente entre dispositivos.

## Limitações conhecidas / trabalho pendente

- Desenho de polígonos para telhados irregulares.
- Calibração da escala da imagem usando uma distância conhecida.
- Desenho e exclusão de obstáculos/áreas proibidas.
- Algoritmo de distribuição que respeite polígonos, obstáculos, recuos e espaçamentos.
- Cotas dimensionais mais completas e verificáveis.
- Exportação PDF com layout de relatório profissional consistente.
- Armazenamento offline mais robusto (por exemplo, IndexedDB) e política de backup/exportação de projetos.
- Sincronização entre dispositivos, caso venha a ser necessária.
- PWA instalável com service worker e testes offline reais.
- Fluxo de pesquisa/importação de imagens aéreas com fonte/licença apropriada. Não assumir que qualquer serviço de mapas permite baixar ou armazenar imagens.
- Melhorar acessibilidade, responsividade e testes em Android, tablet e desktop.
- Validação técnica de segurança/instalação permanece fora do escopo automático do protótipo.

## Princípios importantes

1. Não alegar precisão topográfica a partir de uma imagem de satélite comum. Exigir calibração e permitir correção manual.
2. Distinguir potência nominal dos módulos (kWp) de produção real de energia.
3. Não tratar o layout como projeto elétrico/estrutural validado. Recuos, cargas, fixações, sombreamento e regras locais devem ser verificados por profissional responsável.
4. Preservar a simplicidade de uso para alguém que trabalha na obra.
5. Manter o produto bilingue: italiano e português brasileiro.


## Versão 3 (14/10/2026): telhado irregular, calibração e backup

Novidades (a versão anterior está guardada em `versoes/index-v2-original.html`):

- **Formato do telhado**: retângulo (como antes) ou polígono irregular.
- **Editar contorno**: arraste os pontos; toque no “+” no meio de um lado para inserir um ponto; “Excluir ponto” remove o ponto selecionado; “Traçar novo contorno” desenha ponto a ponto (feche tocando o primeiro ponto).
- **Calibrar escala**: com uma imagem importada, toque nas duas pontas de uma distância real conhecida e digite os metros. O contorno traçado sobre a imagem é reescalado junto.
- **Distribuição no polígono**: os módulos respeitam contorno, distância da borda e área excluída; painéis inválidos aparecem em vermelho com aviso.
- **Backup**: “Exportar backup” baixa um `.json` com todos os projetos e modelos; “Importar backup” recupera esse arquivo.

## Como testar localmente

1. Abra `index.html` no Chrome/Edge (no Android também é possível abrir o arquivo pelo navegador).
2. Retângulo: clique em “Distribuir painéis” e confira que 20 × 10 m geram 63 módulos de 1900 × 1134 mm (mesmo resultado da v2).
3. Polígono: em “Forma do telhado”, escolha “Polígono irregular”, arraste um canto, clique em “Painéis” e depois em “Distribuir painéis”.
4. Calibração: importe uma foto aérea, clique em “Calibrar escala”, toque em duas pontas de uma medida conhecida e digite a distância.
5. Salve o projeto, recarregue a página e reabra-o; exporte e importe um backup.

Limitações atuais: a grade de módulos segue os eixos da tela (não gira para acompanhar um lado inclinado do telhado); a área excluída ainda é só um retângulo central; o selo “PRONTO OFFLINE” ainda não corresponde a um app instalável (falta service worker/manifest). As medidas a partir de imagem são estimativas e precisam de conferência no local.


## Versão 4 (14/10/2026): obstáculos, grade alinhada e offline (PWA)

- **Obstáculos em qualquer posição** (nos dois modos): ferramenta “Obstáculos”; arraste no desenho para criar, toque para selecionar e mover, arraste o quadradinho do canto inferior direito para redimensionar; “Excluir obstáculo” remove. O campo “Distância dos obstáculos (m)” define a folga mínima. A antiga área central continua funcionando.
- **Grade alinhada ao telhado** (modo polígono): “Alinhar a um lado” e toque em um lado do telhado; a grade gira para acompanhar esse lado. O ângulo também pode ser digitado em “Ângulo da grade (°)”.
- **Offline de verdade (PWA)**: `manifest.webmanifest`, `sw.js` e a pasta `icons/`. Quando o app é aberto por um endereço `https://` (ou `http://localhost`), o navegador guarda os arquivos e o app abre sem internet; no Android aparece a opção “Instalar app”/“Adicionar à tela inicial”. O selo no topo mostra o estado real: PRONTO OFFLINE, OFFLINE NÃO ATIVO ou ARQUIVO LOCAL.

### Como testar o offline no computador

1. Na pasta do projeto, rode `python -m http.server 8000` (precisa do Python instalado).
2. Abra `http://localhost:8000/index.html` no Chrome e espere o selo mostrar “PRONTO OFFLINE”.
3. Pare o servidor (Ctrl+C) ou desligue a internet e recarregue a página: o app deve abrir igual.

### Como instalar no Android

O Android só instala o app a partir de um endereço `https://`. Abrir o `index.html` pelo gerenciador de arquivos funciona, mas não instala nem ativa o modo offline do navegador. Uma opção gratuita é publicar a pasta no GitHub Pages (ou Netlify). Isso torna os arquivos do app públicos; os projetos continuam salvos só no aparelho.

**Ao publicar uma versão nova**, aumente o nome do cache em `sw.js` (hoje `solvento-v6` → `solvento-v7`) para os aparelhos baixarem a atualização.

### Limitações que continuam

- A distribuição é uma grade simples; não otimiza o deslocamento para caber mais módulos, e não há verificação de sobreposição entre painéis movidos à mão.
- Obstáculos são retângulos alinhados à tela (não giram).
- Medidas a partir de imagem são estimativas; tudo precisa de conferência no local e validação profissional.
- Ainda não testado em aparelho Android real.


## Versão 5 (14/10/2026): acabamentos

- Projeto com **data**; botões **Duplicar** e **Excluir** para o projeto selecionado na lista.
- Biblioteca: **Atualizar modelo** e **Excluir modelo**.
- Painéis **sobrepostos** (movidos à mão um em cima do outro) ficam em vermelho.
- **Imprimir / Salvar PDF** gera uma página com tabela-resumo (cliente, endereço, data, módulo, quantidade, kWp, áreas, distâncias, obstáculos, origem das medidas, notas), a planta e o aviso de protótipo. Exemplo: `entregas/exemplo-relatorio-v5.pdf` na pasta do projeto do Claude.

## Versão 6 (14/10/2026): uso no dia a dia

- A **imagem do telhado continua** ao recarregar a página (antes sumia se o projeto não fosse salvo).
- O app pede ao navegador **armazenamento persistente**, para o Android não apagar os projetos quando falta espaço.
- **Desfazer** (botão “↶” ou Ctrl+Z): volta pontos, obstáculos, distribuição, calibração e troca de formato, até 60 passos.
- **Zoom no modo polígono**: dois dedos (pinça) ou roda do mouse; com a ferramenta “Painéis”, arraste uma área vazia para mover a vista. “Ajustar vista” volta ao enquadramento.
- No traçado e na calibração, o ponto entra ao **soltar o dedo**, para o zoom com dois dedos não criar pontos por engano.
- **Distribuição otimizada**: testa 64 deslocamentos da grade e fica com o que cabe mais módulos (ex.: com obstáculo, 52 → 57; telhado inclinado sem alinhar, 53 → 57). Em telhado retangular simples o resultado não muda (20 × 10 m = 63).

## O que só dá para fazer no seu computador/celular

1. **Testar num Android de verdade** (toque, tamanho dos botões, instalação): precisa do aparelho.
2. **Publicar em https** (GitHub Pages ou Netlify) para instalar o app e usar offline no celular: precisa da sua conta e da sua autorização.
3. **Continuar com o Claude Code no PC**, se preferir trabalhar direto na pasta: extraia o ZIP e siga `CONTINUAR_NO_CLAUDE_CODE.txt`.
