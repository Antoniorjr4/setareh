# Setareh

![Setareh · paisagem persa sob um sol dourado](assets/hero.webp)

Caderno bilíngue de astrologia, símbolos e cultura persa. Site estático com artigos, filtros, perguntas e pedidos de consulta por e-mail. As imagens ficam no próprio projeto. Os três textos e as perguntas iniciais são exemplos editoriais para a autora revisar ou substituir antes da estreia.

## Colocar no GitHub Pages

Em **Settings → Pages**, escolha **Deploy from a branch**, selecione **main** e **/(root)** e salve. O site usa caminhos relativos e funciona em um subdiretório. Não precisa instalar dependências.

## Dar acesso à autora uma única vez

1. Acesse https://app.pagescms.org com a conta GitHub proprietária. Instale o aplicativo Pages CMS selecionando apenas o repositório deste site.
2. Abra o repositório e a branch que o Pages publica. A configuração do editor já está em `.pages.yml`.
3. Na área de colaboradores do Pages CMS, convide o e-mail da autora. Ela pode usar o convite por e-mail, sem conta no GitHub. Restrinja os convites à autora. O proprietário mantém acesso administrativo.
4. Em **Contato**, preencha o endereço que ela deseja tornar público. Salve e aguarde a atualização do Pages.

## Rotina da autora

Use **Área da autora** no rodapé para entrar no Pages CMS. Em **Caderno · artigos**, acrescente um item, escolha uma das três capas, preencha os campos em português e inglês e salve. Use um identificador exclusivo, com letras minúsculas e hífens, e conserve-o nas edições para que os links continuem funcionando. A ordem da lista define a ordem na página. As categorias são tradição (tradition), símbolos (symbols) e reflexões (notes). A autora também pode editar respostas em **Perguntas e respostas**.

Os campos de texto aceitam texto simples. Uma linha em branco separa os parágrafos. Os visitantes podem abrir um artigo e compartilhar o endereço da barra do navegador. A escolha de idioma acompanha o link quando feita pelo seletor PT/EN.

## Correspondência e consultas

O botão prepara uma mensagem no aplicativo de e-mail do visitante. Ele revisa o texto e envia. O pedido de consulta inclui data, horário e fuso. A autora responde por e-mail para confirmar ou propor outra opção. As mensagens ficam na caixa de e-mail e a autora escolhe quais perguntas publicar no caderno. Sem endereço cadastrado, o site informa que a correspondência ainda está fechada.

## Conferir no computador

Nesta pasta, execute `python -m http.server 8000` e abra http://localhost:8000. No Windows, também pode usar `py -m http.server 8000`.
