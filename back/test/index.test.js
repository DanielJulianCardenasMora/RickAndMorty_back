const app = require('../src/app');
const session = require('supertest');
const agent = session(app);
const char1 = { id: 1, name: 'Rick' };
const char2 = { id: 2, name: 'Morty' };





describe('Test de RUTAS', () => {
  
  describe('GET /rickandmorty/character/:id', () => {
    
    it('Responde con status 200', async () => {
      await agent
        .get('/rickandmorty/character/1')
        .expect(200);
    })
    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
      const response = (await agent
        .get('/rickandmorty/character/1')).body;
      expect(response).toHaveProperty('id')
      expect(response).toHaveProperty('name')
      expect(response).toHaveProperty('species')
      expect(response).toHaveProperty('gender')
      expect(response).toHaveProperty('status')
      expect(response).toHaveProperty('origin')
      expect(response).toHaveProperty('image')
    })
    it('Si hay un error responde con status: 404', async () => {
      await agent
        .get('/rickandmorty/charactererror/44553')
        .expect(404);
    })
  })

  describe('GET /rickandmorty/login', () => {
    it('Retorna un objeto con propiedad {access: true}', async () => {
      const response = await agent 
        .get('/rickandmorty/login?email=x&password=x')
      expect(response.body.access).toBe(true)
    })
    it('Retorna un objeto con propiedad {access: false}', async () => {
      const response = await agent 
        .get('/rickandmorty/login?email=x11&password=x11')
      expect(response.body.access).toBe(false)
    })
  })

  describe('POST /rickandmorty/fav', () => {
    it('Retorna un JSON enviando un array con lo dado por body', async () => {
      const response = await agent
        .post('/rickandmorty/fav')
        .send(char1)
      expect(response.body).toEqual([char1])
    })

    it('Retorna un JSON enviando un array con lo dado por body sin perder el anterior', async () => {
      const response = await agent
        .post('/rickandmorty/fav')
        .send(char2)
      expect(response.body).toEqual([char1, char2])
    })
  })

  describe('DELETE /rickandmorty/fav/:id', () => {
    it('No modifica el array de favoritos si el id pasado no corresponde a ningun personaje', async () => {
      const response = await agent
        .delete('/rickandmorty/fav/5')
      expect(response.body).toEqual([char1, char2])
    })
    it('Elimina el personaje si se pasa un id valido', async () => {
      const response = await agent
        .delete('/rickandmorty/fav/1')
      expect(response.body).not.toContainEqual(char1)
      expect(response.body).toContainEqual(char2)
    })
  })
})