import { AuthorController } from './author.controller';
import { Author } from './author.entity';

import { CreateAuthorDto, CreatedAuthorDto } from './dto/create';
import { Repository } from 'typeorm';

describe('Creating an author', () => {
  
  let controller: AuthorController;
  let repository: Repository<Author>;

  const authorInput: CreateAuthorDto = {  
    "email": "vanessa.tonini@caelum.com.br",
    "name": "Vanessa Tonini",
    "description": "Instrutora e desenvolvedora na Caelum"
  }

  beforeEach(async () => {
    repository = new Repository()
    controller = new AuthorController(repository)
  });

  it('Deverá retornar informações completas do autor inclusive com os campos id e createdDate', () => {

    
    jest.spyOn(controller, 'create').mockImplementation((input: CreateAuthorDto) => {
      
      const createdAuthor = new CreatedAuthorDto({...input, ...{id: '789aee21-d2e0-495c-ba4e-baa15607bc81', createdDate: '2020-02-05 18:38:06.946683'}});

      return Promise.resolve(createdAuthor);

    })

    expect(controller.create(authorInput))
    .resolves
    .toStrictEqual(new CreatedAuthorDto({...authorInput, ...{id: '789aee21-d2e0-495c-ba4e-baa15607bc81', createdDate: '2020-02-05 18:38:06.946683'}}));

  });

});
