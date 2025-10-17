import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ShopItem from '#DI3/models/shop_item'
import PexelsService from '#DI3/services/pexels_service'

export default class extends BaseSeeder {
  async run() {
    await ShopItem.truncate()

    const pexelsService = new PexelsService()

    const itemsData = [
      {
        name: 'Épée de Flammes Éternelles',
        description:
          'Une épée légendaire forgée dans les flammes du dragon ancien. Inflige des dégâts de feu supplémentaires et illumine les donjons les plus sombres.',
        searchQuery: 'medieval sword fire',
        price: 1250.0,
        promoPrice: null,
        promoPercentage: null,
        isActive: true,
      },
      {
        name: 'Bouclier du Gardien',
        description:
          'Un bouclier massif béni par les anciens gardiens. Réduit considérablement les dégâts physiques et magiques.',
        searchQuery: 'medieval shield armor',
        price: 800.0,
        promoPrice: 600.0,
        promoPercentage: null,
        isActive: true,
      },
      {
        name: 'Potion de Guérison Majeure',
        description:
          'Une potion alchimique puissante qui restaure instantanément une grande quantité de points de vie.',
        searchQuery: 'red potion bottle glass',
        price: 50.0,
        promoPrice: null,
        promoPercentage: 20,
        isActive: true,
      },
      {
        name: 'Armure de Cuir Renforcé',
        description:
          'Une armure légère mais résistante, parfaite pour les aventuriers agiles. Offre une protection équilibrée.',
        searchQuery: 'leather armor medieval',
        price: 350.0,
        promoPrice: null,
        promoPercentage: null,
        isActive: true,
      },
      {
        name: 'Anneau de Mana Infinie',
        description:
          'Un anneau mystique qui régénère lentement la mana de son porteur. Indispensable pour les mages.',
        searchQuery: 'magic ring blue jewel',
        price: 2000.0,
        promoPrice: null,
        promoPercentage: null,
        isActive: true,
      },
      {
        name: 'Arc Elfe Noir',
        description:
          "Un arc elfique d'une précision redoutable. Ses flèches ne manquent jamais leur cible.",
        searchQuery: 'wooden bow arrow medieval',
        price: 950.0,
        promoPrice: 750.0,
        promoPercentage: null,
        isActive: true,
      },
      {
        name: 'Gemme de Téléportation',
        description:
          'Une gemme rare qui permet de se téléporter instantanément vers un lieu sûr. Usage unique.',
        searchQuery: 'purple crystal gem magic',
        price: 300.0,
        promoPrice: null,
        promoPercentage: 15,
        isActive: true,
      },
      {
        name: 'Grimoire des Ombres',
        description:
          "Un livre ancien contenant des sorts d'ombre puissants. Augmente la puissance magique de façon permanente.",
        searchQuery: 'old book ancient tome',
        price: 1800.0,
        promoPrice: null,
        promoPercentage: null,
        isActive: true,
      },
      {
        name: 'Bottes de Marche Silencieuse',
        description:
          "Des bottes enchantées qui permettent de se déplacer sans faire de bruit. Parfaites pour l'infiltration.",
        searchQuery: 'black leather boots',
        price: 450.0,
        promoPrice: null,
        promoPercentage: 25,
        isActive: true,
      },
      {
        name: 'Marteau de Guerre Nain',
        description:
          'Un marteau de guerre forgé par les maîtres nains. Capable de briser les armures les plus solides.',
        searchQuery: 'war hammer medieval weapon',
        price: 1100.0,
        promoPrice: null,
        promoPercentage: null,
        isActive: true,
      },
      {
        name: 'Collier de Protection Divine',
        description:
          'Un collier béni qui protège contre les malédictions et les sorts de mort instantanée.',
        searchQuery: 'golden necklace pendant',
        price: 1500.0,
        promoPrice: 1200.0,
        promoPercentage: null,
        isActive: true,
      },
      {
        name: 'Dague Empoisonnée',
        description:
          "Une dague enduite d'un poison mortel. Chaque coup a une chance d'empoisonner l'ennemi.",
        searchQuery: 'dagger knife blade',
        price: 280.0,
        promoPrice: null,
        promoPercentage: null,
        isActive: true,
      },
      {
        name: "Cape d'Invisibilité",
        description:
          'Une cape magique qui rend son porteur invisible pendant de courtes périodes. Très recherchée par les voleurs.',
        searchQuery: 'black hooded cloak',
        price: 2500.0,
        promoPrice: null,
        promoPercentage: 10,
        isActive: true,
      },
      {
        name: 'Bâton de Mage Suprême',
        description:
          'Le bâton ultime pour les maîtres de la magie. Amplifie tous les sorts et réduit leur coût en mana.',
        searchQuery: 'wizard staff magic wand',
        price: 3000.0,
        promoPrice: null,
        promoPercentage: null,
        isActive: true,
      },
      {
        name: 'Potion de Force de Géant',
        description:
          'Une potion qui augmente temporairement la force physique à des niveaux surhumains.',
        searchQuery: 'blue potion bottle magic',
        price: 120.0,
        promoPrice: 90.0,
        promoPercentage: null,
        isActive: true,
      },
      {
        name: 'Casque du Berserker',
        description:
          'Un casque viking qui augmente la rage au combat. Plus les dégâts subis sont importants, plus les attaques sont puissantes.',
        searchQuery: 'viking helmet horned',
        price: 680.0,
        promoPrice: null,
        promoPercentage: null,
        isActive: true,
      },
      {
        name: 'Cristal de Résurrection',
        description:
          "Un cristal magique ultra-rare qui peut ramener un allié à la vie. Ne peut être utilisé qu'une seule fois.",
        searchQuery: 'white crystal healing',
        price: 5000.0,
        promoPrice: null,
        promoPercentage: null,
        isActive: true,
      },
      {
        name: 'Gantlets du Pugilat',
        description:
          'Des gantelets renforcés qui transforment les poings en armes redoutables. Parfaits pour les moines combattants.',
        searchQuery: 'metal gauntlets gloves',
        price: 420.0,
        promoPrice: null,
        promoPercentage: 30,
        isActive: true,
      },
      {
        name: 'Lanterne des Âmes Perdues',
        description:
          'Une lanterne mystique qui révèle les secrets cachés et guide les âmes égarées vers la sortie des labyrinthes.',
        searchQuery: 'old lantern lamp light',
        price: 750.0,
        promoPrice: null,
        promoPercentage: null,
        isActive: true,
      },
      {
        name: 'Sac à Dos Dimensionnel',
        description:
          "Un sac magique qui peut contenir une quantité illimitée d'objets sans prendre de poids supplémentaire.",
        searchQuery: 'leather backpack bag',
        price: 1600.0,
        promoPrice: 1280.0,
        promoPercentage: null,
        isActive: true,
      },
    ]

    const items = []
    for (const itemData of itemsData) {
      console.log(`🔍 Recherche d'image pour: ${itemData.name}`)
      const imageUrl = await pexelsService.searchImage(itemData.searchQuery)

      items.push({
        name: itemData.name,
        description: itemData.description,
        imageUrl: imageUrl || 'https://via.placeholder.com/400x400?text=No+Image',
        price: itemData.price,
        promoPrice: itemData.promoPrice,
        promoPercentage: itemData.promoPercentage,
        isActive: itemData.isActive,
      })

      // Petite pause pour éviter de dépasser les limites de l'API
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    await ShopItem.createMany(items)

    console.log('✅ Shop items seedé avec succès!')
  }
}
