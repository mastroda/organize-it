import { environment } from 'src/environments/environment';

/**
 * Specifica le url dei webservice di produzione o di test
 */
enum WsUrl {
    dev = 'http://localhost:3000/',
    prod = 'api/'
}

/**
 * In base al tipo di ambiente corrente (sviluppo o produzione) ritorna la url corretta da utilizzare
 */
export const WEB_SERVICE_URL: string = environment.production ? WsUrl.prod : WsUrl.dev;

