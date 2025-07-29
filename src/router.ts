import express, { Request, Response } from 'express';
import Joi from 'joi';

const router = express.Router();


const schema = Joi.object({
  data: Joi.array()
    .items(Joi.string())          
    .required()
});


const USER_ID   = 'shakti_dubey_20102003';
const EMAIL     = 'shakti2282.be22@chitkara.edu.in';
const ROLL_NUM  = '2210992282';


router.post('/', (req: Request, res: Response) => {
 
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      is_success: false,
      error: error.details[0].message
    });
  }

  
  const isNumeric = (s: string) => !isNaN(Number(s));
  const isAlpha   = (s: string) => /^[A-Za-z]+$/.test(s);

  
  const odd:  string[] = [];
  const even: string[] = [];
  const alph: string[] = [];
  const spec: string[] = [];
  let sum = 0;


  const alphaChars: string[] = [];           

  for (const raw of value.data) {
    const str = String(raw);

    if (isNumeric(str)) {
      const n = Number(str);
      (n % 2 === 0 ? even : odd).push(str);
      sum += n;
    } else if (isAlpha(str)) {
      alph.push(str.toUpperCase());
      alphaChars.push(...str.split(''));
    } else {
      spec.push(str);
    }
  }

  
  const reversed = alphaChars.reverse();
  let concat_string = '';
  reversed.forEach((ch, idx) => {
    concat_string += idx % 2 === 0
      ? ch.toUpperCase()
      : ch.toLowerCase();
  });


  res.status(200).json({
    is_success: true,
    user_id: USER_ID,
    email: EMAIL,
    roll_number: ROLL_NUM,
    odd_numbers: odd,
    even_numbers: even,
    alphabets: alph,
    special_characters: spec,
    sum: sum.toString(),
    concat_string
  });
});

export default router;