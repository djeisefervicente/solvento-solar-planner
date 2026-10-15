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

**Ao publicar uma versão nova**, aumente o nome do cache em `sw.js` (hoje `solvento-v9` → `solvento-v10`) para os aparelhos baixarem a atualização.

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

## Versão 7 (14/10/2026): primeiro ver o telhado

- Ao **importar uma imagem**, ela aparece limpa e na proporção certa (modo polígono), sem painéis por cima.
- Os painéis só aparecem quando você clica em **“Distribuir painéis”** (o app não distribui mais sozinho ao abrir ou ao criar projeto novo).
- Ordem sugerida: importar imagem → “Calibrar escala” → “Traçar novo contorno” → “Distribuir painéis”. Se importar por engano, “↶ Desfazer” volta ao estado anterior.

## Versão 8 (14/10/2026): medir na foto em 3 passos

No modo polígono aparece uma barra com 3 botões:
1. **① Escala: medida conhecida**: toque nas duas pontas de algo cuja medida real você sabe (um lado medido no local, ou medido no Google Maps com “Medir distância”) e digite os metros. Sem foto, o botão pede a medida real de um lado já desenhado.
2. **② Desenhar o telhado**: toque nos cantos do telhado (mouse ou dedo). Cada lado mostra a medida; com o mouse, a medida aparece enquanto você move.
3. **③ Adicionar painéis**: calcula a área do desenho e enche de painéis conforme o tamanho e a potência do modelo escolhido, mostrando quantidade e kWp.

Ferramentas extras: **📏 Medir** (distância de A até B, sem mudar nada) e **Definir medida de um lado** (toque num lado e digite o comprimento real; tudo é reescalado).

Sem nenhuma medida real o app não tem como saber o tamanho do telhado: uma foto sozinha não traz escala.

## Versão 28 (15/10/2026): painéis em perspectiva na foto
- Novo botão **📐 Prospettiva / Perspectiva** (ao lado de 🧪 Escala de exemplo). Serve para fotos tiradas de lado (drone, inclinadas).
- Como usar:
  1. Marque os 4 cantos do telhado em ordem, com ② ou com 📏 Medir (4 lados fechados).
  2. Clique em 📐. Aparecem as letras A, B, C e D nos cantos.
  3. Escreva quanto medem de verdade o lado A→B e o lado B→C.
- Os painéis aparecem já em cima do telhado, seguindo a perspectiva da foto: menores no fundo, maiores na frente.
- A contagem, os kWp, a área (A→B × B→C), os obstáculos, o desfazer, o salvar, o relatório e a vista 3D usam as medidas reais.
- Clicar de novo em 📐 volta para a vista plana.
- Limite: considera o telhado como um retângulo plano. As medidas são as que você escreve; confira no local.

## Versão 27 (15/10/2026): revisão completa e pequenas correções
- Testados todos os botões no computador e no celular, em italiano e português, sem erros.
- Testados também: salvar e abrir projetos, backup, PNG, PDF, vista 3D e uso offline.
- Corrigido: importar de novo a MESMA imagem (por exemplo depois de “Novo projeto”) não fazia nada.
- Corrigido: “Novo projeto” e “Apri” deixavam na tela as linhas de medição do projeto anterior. Agora começam limpos.
- Corrigido: “Novo projeto” agora mostra uma mensagem de confirmação.
- Corrigido: depois de “Salvar modelo”, o modelo salvo já fica selecionado, então “Atualizar” e “Excluir” funcionam na hora.
- Corrigido: a data na lista de projetos usa o formato italiano/brasileiro (15/10/2026).

## Versão 26
- Os botões de medição (① ② ③, 📏 Misura, 🧪 Scala di esempio, Altri strumenti) agora aparecem sempre, também quando a forma do telhado está em “Rettangolo”. Ao clicar num deles, o app muda sozinho para “Poligono irregolare”.
- Verificação antes de publicar: `node tests/check-buttons.js http://localhost:8766/` confere se todos os botões principais estão visíveis no computador e no celular, nos dois modos.

## Versão 25 (14/10/2026): painéis em pé ou deitados

- Dois botões acima do desenho: **▯ Em pé** (vertical) e **▭ Deitados** (horizontal). Ao clicar, todos os painéis são redistribuídos nessa posição.
- A mensagem mostra quantos painéis cabem na posição escolhida e quantos caberiam na outra, para comparar (ex.: deitados 64, em pé 63).
- É a mesma opção "Orientação" do Modelo de painel, agora mais fácil de achar.

## Versão 24 (14/10/2026): painéis seguem a linha do telhado

- Ao clicar em **③**, a grade de painéis é alinhada automaticamente ao **lado mais comprido** do contorno traçado, então os painéis ficam retos em relação ao telhado (não mais em diagonal).
- Para alinhar a outro lado: **Mais ferramentas → Alinhar a um lado** e toque no lado desejado (essa escolha é mantida até você traçar um contorno novo).
- Em fotos tiradas de lado (em perspectiva) os lados do telhado não são paralelos; o melhor resultado é com foto vista de cima.

## Versão 23 (14/10/2026): mostrar onde está o problema

- Correção: ao trocar a forma do telhado (ex.: de Polígono para Retângulo), os painéis antigos ficavam e todos apareciam como "com problema" (ex.: 502 painéis num telhado de 200 m²). Agora o app redistribui os painéis para a forma nova. Projetos salvos com esse problema abrem limpos.
- Painéis com problema ficam **vermelhos com ⚠ e borda amarela**.
- No aviso vermelho embaixo do desenho há dois botões: **🔍 Mostrar onde** (move e aproxima o desenho até os painéis com problema) e **↻ Redistribuir painéis**.

## Versão 22 (14/10/2026): escala de exemplo para teste

- Botão **🧪 Escala de exemplo**: para fotos da internet sem nenhuma medida real. O app pergunta mais ou menos quantos metros de largura tem a imagem inteira (sugere 40 m) e usa isso como escala.
- Também é oferecido quando você clica em 📏 Medir/② sem escala e responde que não tem medida real.
- Fica sempre marcado como **ESCALA DE EXEMPLO (números não reais)** no desenho, nos resultados e no relatório. Para um projeto de verdade, use ① com uma medida real.

## Versão 21 (14/10/2026): conferência da escala

- Durante a escala ①, a linha mostra **"? m"** em vez de um número provisório, para não confundir.
- A pergunta agora diz claramente: digite quantos metros a linha mede **de verdade** (medida no local ou no Google Maps).
- Se você digitar quase o mesmo número provisório do app, ou se a imagem inteira ficar com menos de 6 m (ou mais de 3 km) de largura, o app avisa e deixa refazer.
- No ③, se nenhum painel couber, o app mostra o tamanho da forma (ex.: 1,9 × 1,3 m) e oferece refazer a escala.

## Versão 20 (14/10/2026): a linha para quando você solta

- Correção: depois de soltar o botão do mouse, uma linha continuava seguindo o mouse (no Medir, na escala ① e no desenho ②). Agora a linha só aparece enquanto o botão (ou o dedo) está apertado, em todas as ferramentas.
- Se o "soltar" se perder (por exemplo, soltando fora do desenho ou depois de uma janela de pergunta), o app encerra a linha sozinho.
- No ② Desenhar também dá para pressionar, arrastar e soltar.
- O número da versão aparece embaixo do título (ex.: "versão 20"), para conferir se o aparelho já pegou a versão nova.

## Versão 19 (14/10/2026): apagar só um pedaço

- Botão **✂ Apagar um pedaço**: com ele ligado, toque numa linha de medição, num painel, num obstáculo ou num ponto do contorno, e só aquilo é apagado. Arrastar continua movendo a imagem.
- Clique de novo no botão para sair. Painéis, obstáculos e pontos do contorno voltam com ↶ Desfazer.

## Versão 18 (14/10/2026): limpar tudo

- Botão **🧹 Limpar tudo** acima do desenho: apaga de uma vez medições, contorno, painéis e obstáculos. Fica só a imagem do telhado (e a escala, se já foi feita). Pede confirmação e dá para desfazer com ↶.

## Versão 17 (14/10/2026): escala primeiro

- Com imagem importada e ainda **sem escala**, o botão **① Scala** fica vermelho piscando com ⚠.
- Ao clicar em **📏 Medir** ou **② Desenhar** sem escala, o app pergunta se quer fazer a escala antes (OK = fazer agora). Depois da escala, volta direto para o Medir.
- A escala também pode ser feita **arrastando** de uma ponta à outra da distância conhecida (não só tocando as duas pontas).
- Se no ③ a forma der pequena demais por falta de escala, o app explica e oferece fazer a escala.

## Versão 16 (14/10/2026): ③ funciona mesmo com linhas separadas

- Correção: se a forma era traçada com linhas separadas (sem começar exatamente no fim da linha anterior) ou sem voltar exatamente ao ponto A, o ③ não colocava painéis.
- Agora, ao começar ou terminar uma linha perto da ponta de outra, elas se juntam sozinhas; terminar perto do A fecha a forma.
- Ao clicar em ③, se a forma não estiver fechada, o app junta as linhas medidas e fecha a forma automaticamente antes de colocar os painéis.
- Se não houver forma ou se nenhum painel couber, aparece uma mensagem explicando o motivo (escala, medida do painel ou distância da borda).

## Versão 15 (14/10/2026): painéis dentro da medição

- Depois de fechar uma forma com **📏 Medir**, clique em **③ Adicionar painéis** (ou **Distribuir painéis**): o app preenche essa forma com o modelo de painel escolhido, sem precisar de outro botão.
- A quantidade de painéis e a potência (kWp) aparecem numa etiqueta verde no canto do desenho, além dos números embaixo.

## Versão 14 (14/10/2026): medir clicando e arrastando

- **📏 Medir**: cada linha é feita pressionando no ponto A, arrastando e soltando no ponto B. Ao soltar, a linha para (não fica seguindo o mouse).
- Para continuar do mesmo ponto, pressione em cima do último ponto e arraste. Pressionando em outro lugar começa uma linha nova (as medidas anteriores continuam no desenho).
- Para fechar a forma, arraste até o ponto A: aparecem m², comprimento × largura e perímetro.
- Um clique sem arrastar não cria ponto.
- Clique de novo em 📏 para desligar o Medir; sem ferramenta ligada, arrastar move a imagem.

## Versão 13 (14/10/2026): medir arrastando o dedo

- Correção: no modo **📏 Medir**, arrastar o dedo ou o mouse era ignorado. Agora dá para **arrastar** de A até B (a linha segue o dedo e mostra a medida) ou **tocar** ponto por ponto, misturando os dois.
- Quando o modo Medir está ligado aparece a etiqueta azul **📏 MEDIR LIGADO** no canto do desenho e o cursor vira uma cruz.
- Os botões Fechar medição e Usar como contorno ficam sempre no lugar (cinza até poder usar), para o desenho não pular enquanto você mede.
- Quando sai uma versão nova do site, o app recarrega sozinho uma vez para usar a versão nova.

## Versão 12 (14/10/2026): vista 3D

- Botão **🧊 Vista 3D** acima do desenho: mostra o prédio, o telhado inclinado, os painéis e os obstáculos em 3D.
- Na vista 3D dá para ajustar a **inclinação** do telhado (0–60°), o **lado do beiral** (parte baixa) e a **altura do prédio**.
- Arraste para girar; dois dedos ou a rodinha do mouse para zoom; Shift+arrastar ou três dedos para mover.
- No modo polígono com imagem importada, a foto aparece sobre o telhado em 3D.
- **Salvar imagem PNG** baixa a vista 3D atual.
- Usa a biblioteca gratuita **three.js** (licença MIT, sem custo), guardada no próprio app em `vendor/three.min.js`, então funciona offline. Arquivo novo: `view3d.js`.
- Limites: um telhado de uma só água (sem cumeeira de duas águas); inclinação e altura digitadas à mão; as medidas do desenho 2D são tratadas como medidas sobre a superfície do telhado. É uma imagem ilustrativa, não um projeto de engenharia.

## Versão 11 (14/10/2026): medição com vários pontos

- **📏 Misura / Medir** agora aceita vários pontos: toque em A, B, C, D… Cada trecho mostra o comprimento e os pontos ganham letras.
- Para fechar a forma, toque de novo no ponto A ou em **Chiudi misura / Fechar medição**.
- Com a forma fechada aparecem: área em m², comprimento × largura (comprimento medido ao longo do trecho A→B, largura na perpendicular) e perímetro.
- **Usa come contorno del tetto / Usar como contorno do telhado** transforma a forma medida no telhado; depois basta ③ Distribuir painéis.
- As medidas são estimativas e dependem da escala calibrada; confira no local.

## Versão 10 (14/10/2026): botões de zoom

- Três botões no canto superior direito do desenho: **+** (aproximar), **−** (afastar) e **⤢** (ajustar a vista para ver o telhado inteiro).
- O zoom agora funciona também no modo **Retângulo** (antes só no polígono): botões, roda do mouse, pinça com dois dedos e arrastar uma área vazia para mover a vista.
- Ao exportar PNG ou imprimir/PDF, o desenho sai sempre inteiro, mesmo se a tela estiver com zoom.
- Teste: clique 3 vezes em **+**, toque num painel (ele deve ser selecionado), depois clique em **⤢**.

## Versão 9 (14/10/2026): visual novo e mais fácil

- Visual renovado: logotipo, cores mais suaves, botões maiores para o dedo, cartões arredondados, potência (kWp) em destaque, avisos em caixas coloridas.
- Barra de ferramentas mais limpa: ferramentas raras ficam em **“Mais ferramentas”**; botões sem uso no momento ficam apagados (ex.: “Excluir ponto” só acende com um ponto selecionado). Botões de apagar em vermelho.
- Seções da lateral abrem e fecham (Notas começa fechada).
- No celular, os 3 passos ficam numa linha só, e o desenho aparece mais alto na tela.
- Mais leve ao arrastar: desenha no máximo uma vez por quadro e só grava ao soltar.

## O que só dá para fazer no seu computador/celular

1. **Testar num Android de verdade** (toque, tamanho dos botões, instalação): precisa do aparelho.
2. **Publicar em https** (GitHub Pages ou Netlify) para instalar o app e usar offline no celular: precisa da sua conta e da sua autorização.
3. **Continuar com o Claude Code no PC**, se preferir trabalhar direto na pasta: extraia o ZIP e siga `CONTINUAR_NO_CLAUDE_CODE.txt`.
