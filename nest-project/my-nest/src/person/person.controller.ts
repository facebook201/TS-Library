import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  // form urlencode body 传输数据，把query字符串放在body里
  @Post()
  body(@Body() createPersonDto: CreatePersonDto) {
    return `received: ${JSON.stringify(createPersonDto)}`;
  }

  // json
  // @Post()
  // body(@Body() createPersonDto: CreatePersonDto) {
  //   return `received: ${JSON.stringify(createPersonDto)}`
  // }

  /**
   * Nest 解析 form data 使用 FilesInterceptor 的拦截器，用 @UseInterceptors 装饰器启用，然后通过
   * @UploadedFiles 来取。非文件的内容，同样是通过 @Body 来取。
   * formData ------ boundary 分隔
   */
  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  body2(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFile() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return `received: ${JSON.stringify(createPersonDto)}`;
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  // query 方式的传参方式
  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return `received: name=${name},age=${age}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
