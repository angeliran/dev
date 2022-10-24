//fetch esta en todo el engine no se ocupa importar
/**
 * De esta manera es mas escalable la aplicacion ya que en la implementacion
 * no se modificara nada en caso de cambiar la libreria para obtener datos
 * se inicia con fetch, en  caso de cambias a axios u otro, solo se modifica
 * desde este archivo y las instancias dentro de la app funcionarian igual.
 */
class Http {
    static instance = new Http();

    get = async (url) => {
        try {
            let req = await fetch(url);

            let json = await req.json();

            return json;

        } catch (error) {
            console.log("Http get method error", error);

            throw Error(error);
        }
    }

    post = async (url, body) => {
        try {
            let req = await fetch(url, {
                method: "POST",
                body
            });

            let json = await req.json();

            return json;

        } catch (error) {
            console.log("Http method post error", error);

            throw Error(error);
        }
    }

    put = async (url, body) => {
        try {
            let req = await fetch(url, {
                method: "PUT",
                body
            });

            let json = await req.json();

            return json;

        } catch (error) {
            console.log("Http method put error", error);

            throw Error(error);
        }
    }

    remove = async (url) => {
        try {
            let req = await fetch(url, {
                method: "DELETE",
            });

            let json = await req.json();

            return json;

        } catch (error) {
            console.log("Http method delete error", error);

            throw Error(error);
        }
    }
}

export default Http;