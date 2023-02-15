import { Request, Response } from 'express';

const requestHandler = (_: Request, res: Response) => {
  if (res.locals.body) {
    return res.status(res.locals.status).json(res.locals.body);
  } else {
    const response: any = {};

    if (res.locals.data) response.data = res.locals.data;
    if (res.locals.message) response.message = res.locals.message;

    if (res.locals.content) {
      response.content = res.locals.content;
      response.filename = res.locals.filename;


      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );

      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${res.locals.filename}.xlsx`
      );

      const buffer = res.locals.content;

      return res.end(Buffer.from(buffer, 'base64'));
    }

    return res.status(res.locals.status || 200).json(response);
  }
};

export default requestHandler;