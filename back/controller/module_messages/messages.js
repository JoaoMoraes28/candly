/********************************************************************   MENSAGENS PADRONIZADAS  ********************************************************************/

const DEFAULT_HEADER = {status_code: Number}

/********************************************************************   MENSAGENS DE SUCESSO    ********************************************************************/

const SUCCESS_REQUEST = {status_code: 200}

const SUCCESS_CREATE_ITEM = {status_code: 201}

const SUCCESS_UPDATE_ITEM = {status_code: 200}

const SUCCESS_DELETE_ITEM = {status_code: 200, message: 'Item excluído com sucesso...'}


/********************************************************************    MENSAGENS DE ERRO      ********************************************************************/

const ERROR_NOT_FOUND = {status_code: 404, message: 'Não foram encontrados dados de retorno!'}

const ERROR_INTERNAL_SERVER_CONTROLLER = {status_code: 500, message: 'Não foi possivel processar a requisição devido a erros internos no servidor. (CONTROLLER)'}

const ERROR_INTERNAL_SERVER_MODEL = {status_code: 500, message: 'Não foi possivel processar a requisição devido a erros internos no servidor. (MODEL) '}

const ERROR_REQUIRED_FIELDS = {status_code: 400, message: 'Existem campos obrigatórios que não foram preenchidos ou estão inválidos!'}

const ERROR_CONTENT_TYPE = {status_code: 415, message: 'Não foi possível processar a requisição, pois o tipo de dado enviado no corpo deve ser JSON'}

const ERROR_CONTENT_TYPE_FORM_DATA = {status_code: 415, message: 'Não foi possível processar a requisição, pois o tipo de dado enviado no corpo deve ser FORM-DATA'}

const ERROR_RELATIONAL_INSERTION = {status_code: 500, message: 'A requisição do item principal foi processada com sucesso, porém houveram problemas ao inserir dados na tabela de relação!'}

const ERROR_UNIQUE_CONFLICT = {status_code: 409, message: "Não foi possivel processar a requisição pois o item principal causará um conflito na base de dados."}

const ERROR_DISABLED_USER = {status_code: 403, message: "Não foi possível acessar esse usuário."}

const ERROR_INVALID_PASSWORD = {status_code: 401, message: "Senha incorreta!"}

module.exports = {
    DEFAULT_HEADER,
    SUCCESS_REQUEST,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATE_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_CONTENT_TYPE_FORM_DATA,
    SUCCESS_UPDATE_ITEM,
    SUCCESS_DELETE_ITEM,
    ERROR_RELATIONAL_INSERTION,
    ERROR_UNIQUE_CONFLICT,
    ERROR_DISABLED_USER,
    ERROR_INVALID_PASSWORD
}