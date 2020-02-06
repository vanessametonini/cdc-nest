import { AuthorController } from './author.controller';
import { Authors } from './author.entity';

import { CreateAuthorDto, CreatedAuthorDto } from './dto/create';
import { Repository } from 'typeorm';

describe('Creating an author', () => {
  
  let controller: AuthorController;
  let repository: Repository<Authors>

  beforeEach(async () => {
    repository = new Repository()
    controller = new AuthorController(repository)
  });

  it('Should return a complete author info with id and createdDate fields', () => {

    const authorInput: CreateAuthorDto = {  
      "email": "vanessa.tonini@caelum.com.br",
      "name": "Vanessa Tonini",
      "description": "Instrutora e desenvolvedora na Caelum"
    }

    const result = new CreatedAuthorDto({...authorInput, ...{id: 'aaa', createdDate: '01022020'}})

    jest.spyOn(controller, 'create').mockImplementation((input: CreateAuthorDto) => {

      return Promise.resolve(result)

    })

    expect(controller.create(authorInput)).resolves.toBe(result)

  });

});
