#####################################################################################################################
#                                                                                                                   #
#                                                       AppMétéOo                                                   #
#                                                                                                                   #
#####################################################################################################################


                Application Saas réalisées lors de ma formation Développeur Web & Web Mobile en JavaScript.
    Elle affiche les prévisions météorologiques actuelles, ainsi que les prévisions pour les prochaines heures et les prochains jours. 


Outils:

    - API Openweather   (https://openweathermap.org/)
    - Flaticon          (https://www.flaticon.com/)

Fonctions:

    - dateAndHour() :

Cette fonction récupère la date et l'heure actuelles, ainsi que les dates des jours suivants.
Elle met à jour l'affichage de ces informations dans la page HTML, notamment l'heure actuelle et les dates des prochains jours.

    - getWeatherByGeoLocation() :

Cette fonction utilise la géolocalisation pour obtenir les coordonnées géographiques de la position actuelle de l'utilisateur.
Elle interroge ensuite l'API OpenWeatherMap pour obtenir les données météorologiques correspondant à ces coordonnées.

    - searchByCityName() :

Cette fonction permet de rechercher les données météorologiques pour une ville spécifique en utilisant son nom.
Elle interroge l'API OpenWeatherMap pour obtenir les données météorologiques de cette ville.

    - updateCityName() :

Cette fonction met à jour le nom de la ville affiché dans la page HTML en fonction de la ville recherchée ou de la géolocalisation.