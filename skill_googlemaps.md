# Skill : Intégration Google Maps & Autocomplétion d’adresse (owner/create-motel)

## Objectif
Permettre à l’utilisateur de saisir une adresse, d’obtenir des suggestions Google Maps (autocomplétion), de sélectionner une suggestion et de récupérer automatiquement les coordonnées GPS et les composants d’adresse (rue, numéro, ville, état).

## Librairies & APIs utilisées
- Google Maps JavaScript API (avec Places API)
- Utilisation du composant natif `window.google.maps.places.Autocomplete` et du service `AutocompleteService` pour suggestions.
- Utilisation de `Geocoder` pour transformer une adresse ou un placeId en coordonnées.

## Bonnes pratiques d’implémentation

1. **Chargement dynamique du script Google Maps**
   - Charger le script JS Google Maps avec la clé API et le paramètre `libraries=places`.
   - Vérifier la présence de la clé dans les variables d’environnement (`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`).
   - Gérer les erreurs de chargement (clé manquante, API non activée, restrictions de domaine).

2. **Initialisation de l’autocomplétion**
   - Attacher `Autocomplete` à l’input d’adresse via un ref React.
   - Restreindre la recherche au Brésil (`componentRestrictions: { country: 'br' }`).
   - Limiter les types à `geocode` pour n’avoir que des adresses.

3. **Suggestions dynamiques**
   - Utiliser `AutocompleteService` pour afficher une liste de suggestions sous l’input dès que l’utilisateur tape 3 caractères ou plus.
   - Afficher un loader et gérer les cas d’absence de suggestions.

4. **Sélection d’une suggestion**
   - Lorsqu’une suggestion est cliquée, utiliser `Geocoder` avec le `placeId` pour obtenir tous les composants d’adresse et les coordonnées.
   - Remplir automatiquement les champs `address`, `city`, `state` et les coordonnées GPS.

5. **Fallback et robustesse**
   - Si l’utilisateur quitte l’input (onBlur), tenter de géocoder l’adresse saisie.
   - Gérer les erreurs d’API, d’absence de résultats ou de restrictions navigateur.

6. **Accessibilité et UX**
   - Afficher un message d’aide sous l’input : “Comece a digitar e selecione o endereço nas sugestões do Google Maps”.
   - Désactiver l’autocomplétion si la clé API n’est pas présente ou si Google Maps n’est pas chargé.

## Extrait de code clé (simplifié)

```tsx
// Initialisation du script Google Maps
useEffect(() => {
  // ...voir code complet dans page.tsx...
  // Charger le script et initialiser l’autocomplete
}, [])

// Suggestions dynamiques
useEffect(() => {
  if (!mapsReady || !window.google?.maps?.places?.AutocompleteService || input.length < 3) return
  // Utiliser AutocompleteService pour suggestions
}, [formData.address, mapsReady])

// Sélection d’une suggestion
const handleSelectAddressSuggestion = (suggestion) => {
  setFormData({ ...prev, address: suggestion.description })
  // Utiliser Geocoder pour récupérer coordonnées et composants
}
```

## Points d’attention


- Toujours restreindre la recherche à `country: 'br'` pour éviter les adresses hors Brésil.
- Gérer les erreurs d’API et afficher un feedback utilisateur.
- Ne jamais stocker la clé API côté client (utiliser les variables d’environnement Next.js).
- Tester sur mobile et desktop (focus, blur, suggestions, sélection).

---

## Affichage des points sur la carte Google Maps (React, API v3.55+)

### Objectif
Afficher dynamiquement sur une carte Google Maps tous les enregistrements (motels) dont les coordonnées (latitude/longitude) ont été enregistrées via l’autocomplétion.

### Librairie recommandée
- [@react-google-maps/api](https://react-google-maps-api-docs.netlify.app/) (officielle, maintenue, compatible React 18+)

### Exemple de composant React moderne

```tsx
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
   width: '100%',
   height: '500px'
};

export default function MotelsMap({ motels }) {
   const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      libraries: ['places']
   });

   // Centrer sur le Brésil ou sur le premier motel
   const defaultCenter = motels.length > 0 && motels[0].lat && motels[0].lng
      ? { lat: motels[0].lat, lng: motels[0].lng }
      : { lat: -14.2350, lng: -51.9253 };

   return isLoaded ? (
      <GoogleMap
         mapContainerStyle={containerStyle}
         center={defaultCenter}
         zoom={5}
      >
         {motels.filter(m => m.lat && m.lng).map(motel => (
            <Marker
               key={motel.id}
               position={{ lat: motel.lat, lng: motel.lng }}
               title={motel.name}
            />
         ))}
      </GoogleMap>
   ) : <div>Chargement de la carte...</div>;
}
```

### Bonnes pratiques
- Utiliser le composant `Marker` pour chaque enregistrement avec coordonnées valides.
- Utiliser `useJsApiLoader` pour charger proprement l’API Google Maps côté client.
- Ne jamais exposer la clé API côté serveur (utiliser les variables d’environnement Next.js).
- Adapter le zoom et le centrage selon la densité des points.
- Pour des clusters ou des volumes importants, utiliser le composant `MarkerClusterer` de la même librairie.

### Nomenclature Google Maps API v3.55+
- Privilégier l’import dynamique via `@react-google-maps/api`.
- Utiliser les nouveaux types et options (voir [doc officielle](https://developers.google.com/maps/documentation/javascript/react-map)).

---

**Résumé UX** :
Après autocomplétion et enregistrement, chaque motel apparaît comme un point sur la carte Google Maps, positionné par latitude/longitude. L’utilisateur peut visualiser tous les établissements d’un coup d’œil, avec possibilité d’ajouter des popups ou des actions sur chaque point.


**Résumé UX** :  
L’utilisateur commence à taper son adresse, des suggestions Google Maps apparaissent, il sélectionne la bonne, et tous les champs sont remplis automatiquement (adresse, ville, état, coordonnées). En cas d’erreur, un message explicite s’affiche.
