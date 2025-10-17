import router from '@adonisjs/core/services/router'
import { apiThrottle } from '#start/limiter'
const UsersController = () => import('#DI2/controllers/users_controller')

router
  .group(() => {
    router.get('/', async () => {
      return {
        message: 'API Utilisateurs pour les DI2',
        endpoints: {
          users: {
            'GET /api/users': 'Liste tous les utilisateurs (pagination)',
            'GET /api/users?search=john': 'Recherche textuelle sur nom, prénom, email',
            'GET /api/users?page=1&perPage=10': 'Pagination personnalisée',
            'GET /api/users/:id': 'Récupère un utilisateur spécifique',
            'POST /api/users':
              'Crée un utilisateur (body: {firstName, lastName, email, age, isActive?})',
            'PUT /api/users/:id':
              'Met à jour un utilisateur (tous les champs requis: firstName, lastName, email, age, isActive)',
            'DELETE /api/users/:id': '⚠️ Toujours interdit - retourne une erreur 403',
          },
        },
        rateLimit: '100 requêtes par 15 minutes par IP',
        validation: {
          firstName: 'min 2 caractères, max 100',
          lastName: 'min 2 caractères, max 100',
          email: 'email valide et unique',
          age: 'entre 18 et 120 ans',
          isActive: 'boolean (optionnel, défaut: true)',
        },
        validationErrorResponse:
          'Les erreurs de validation retournent un code 422 avec les détails des erreurs = {errors: {field: [messages]}}',
        otherErrors:
          'Les erreurs retournent des codes en anglais (ex: USER_NOT_FOUND, DELETE_NOT_ALLOWED) = {error: CODE, message: "detailed message"}',
      }
    })

    router
      .group(() => {
        router.get('/users', [UsersController, 'index'])
        router.get('/users/:id', [UsersController, 'show'])
        router.post('/users', [UsersController, 'store'])
        router.put('/users/:id', [UsersController, 'update'])
        router.delete('/users/:id', [UsersController, 'destroy'])
      })
      .prefix('/api')
      .use(apiThrottle)
  })
  .prefix('di2')
