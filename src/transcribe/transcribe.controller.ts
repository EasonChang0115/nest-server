import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TranscribeService } from './transcribe.service';
import { Response } from 'express';

@Controller('transcribe')
export class TranscribeController {
  constructor(private readonly transcribeService: TranscribeService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('audio'))
  async uploadAudio(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    if (!file) {
      return res.status(HttpStatus.BAD_REQUEST).send('No file provided');
    }
    try {
      const transcription = await this.transcribeService.transcribe(
        file.buffer,
      );
      return res.status(HttpStatus.OK).send({ transcription });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Error processing audio');
    }
  }
}
