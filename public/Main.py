import bardapi
import requests



def main():
    # Crea una instancia de la API de Bard
    bard = bardapi.Bard(token="")

    # Inicializa el chat
    user_input = ""
    while user_input != "salir":
        # Obtén la entrada del usuario
        user_input = input("Escribe tu pregunta: ")

        # Envía la pregunta a Bard
        response = bard.sendMessage(user_input)

        # Imprime la respuesta de Bard
        print(response.getAnswer())

if __name__ == "__main__":
    main()