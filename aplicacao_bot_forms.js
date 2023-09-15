function enviarDadosGrupoTelegram() {
    var idGrupoTelegram = "GROUP_KEY"; // coloque aqui o ID do seu grupo Telegram
    var planilha = SpreadsheetApp.openById("SPREADSHEET_KEY"); // coloque aqui o ID da planilha
    var aba = planilha.getActiveSheet();
    var ultimaLinha = aba.getLastRow();
    var time_now = Utilities.formatDate(new Date(), "CST", "hh:mm:ss a");
    
    // Verifica se já foi enviada a última linha
    var ultimaLinhaEnviada = PropertiesService.getScriptProperties().getProperty('ultimaLinhaEnviada');
    if (ultimaLinhaEnviada == ultimaLinha) {
      return;
    }
    
    // Pega os valores das colunas da última linha
    var valores = aba.getRange(ultimaLinha, 2, 1, 6).getValues(); //ultima linha que estava no codigo, coluna que iniciara a leitura, a quantidade de linhas que vai retornar, quantidades de colunas que serão recolhidas dentro do array '
    var nome = valores[0][0];
    var pessoa = valores[0][1];
    var espaco = valores[0][2];
    var coisas = valores[0][3];
    var dia = valores[0][4];
    var periodo = valores[0][5];
    
    // Cria a mensagem
    var mensagem = "<b>Funcionário que agendou:</b> \n" + nome + "\n\n<b>Qual o professor/colaborador/aluno está solicitando o agendamento:</b> \n" + pessoa + "\n\n<b>Qual espaço/sala será utilizado(a):</b> \n" + espaco + "\n\n<b>Quais maquinários ou equipamentos serão utilizados:</b> \n" + coisas + "\n\n<b>Data da utilização do laboratório:</b> \n" + dia + "\n\n<b>Hora da utilização:</b> \n" + periodo;
  
  

    // Envia a mensagem para o grupo Telegram
    var telegramBotToken = "BOT_KEY"; // coloque aqui o token do seu bot Telegram
    var telegramUrl = "https://api.telegram.org/bot" + telegramBotToken + "/sendMessage?chat_id=" + idGrupoTelegram + "&text=" + encodeURIComponent(mensagem) + "&parse_mode=HTML";
  
    UrlFetchApp.fetch(telegramUrl);
    
    // Atualiza a última linha enviada nas propriedades do script
    PropertiesService.getScriptProperties().setProperty('ultimaLinhaEnviada', ultimaLinha);
  }
  