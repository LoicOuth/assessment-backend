import router from '@adonisjs/core/services/router'
import { apiThrottle } from '#start/limiter'
const ShopItemsController = () => import('#DI3/controllers/shop_items_controller')
const PaymentsController = () => import('#DI3/controllers/payments_controller')

router
  .group(() => {
    router.get('/', async () => {
      return {
        message: 'API Shop pour Dungeon Crawler',
        endpoints: {
          items: {
            'GET /api/shop/items': 'Liste tous les items actifs',
            'GET /api/shop/items?promotions=true': 'Liste uniquement les items en promotion',
            'GET /api/shop/items/:id': 'Récupère un item spécifique',
          },
          payments: {
            'POST /api/shop/payments':
              'Effectue un paiement (body: {sessionId: "abc123", itemIds: [1,2,3], cardNumber: "4111111111111111"})',
            'GET /api/shop/payments/history/:sessionId':
              "Récupère l'historique des paiements (query: ?page=1&perPage=10)",
          },
        },
        rateLimit: '100 requêtes par 15 minutes par IP',
        errorCodes:
          'Les erreurs retournent des codes en anglais (ex: ITEM_NOT_FOUND, INVALID_CARD_NUMBER)',
        validCardNumber: '4111111111111111',
      }
    })

    router
      .group(() => {
        router.get('/items', [ShopItemsController, 'index'])
        router.get('/items/:id', [ShopItemsController, 'show'])
        router.post('/payments', [PaymentsController, 'process'])
        router.get('/payments/history/:sessionId', [PaymentsController, 'history'])
      })
      .prefix('/api/shop')
      .use(apiThrottle)
  })
  .prefix('di3')
