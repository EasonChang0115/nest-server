import { Injectable } from '@nestjs/common';
import { SpeechClient } from '@google-cloud/speech';

@Injectable()
export class TranscribeService {
  private speechClient = new SpeechClient();

  async transcribe(audioBuffer: Buffer): Promise<string> {
    const audio = {
      content: audioBuffer.toString('base64'),
    };

    const config = {
      encoding: 'LINEAR16' as any,
      sampleRateHertz: 16000,
      languageCode: 'zh-TW',
    };

    const request = {
      audio: audio,
      config: config,
    };

    try {
      const [response] = await this.speechClient.recognize(request);
      const transcription = response.results
        .map(
          (result: { alternatives: { transcript: any }[] }) =>
            result.alternatives[0].transcript,
        )
        .join('\n');
      return transcription;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Error transcribing audio.');
    }
  }
}
