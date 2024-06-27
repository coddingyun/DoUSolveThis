import { z } from 'zod';

export const studySchema = z.object({
  studyName: z
    .string()
    .min(1, '필수 입력 사항입니다.')
    .max(15, '15자 이내로 입력해주세요.'),
  studyDescription: z
    .string()
    .min(1, '필수 입력 사항입니다.')
    .max(40, '40자 이내로 입력해주세요.'),
  kakaoUrl: z.string().min(1, '필수 입력 사항입니다.'),
  problemNumber: z
    .preprocess(
      value => {
        if (typeof value === 'string') {
          if (value.trim() === '') {
            return NaN; // 빈 문자열인 경우 NaN을 반환하여 나중에 숫자 검증에서 실패하도록 합니다.
          }
          return +value.replace(/[^0-9]/g, '');
        }
        return value;
      },
      z
        .number()
        .min(1, { message: '1개 이상으로 입력해주세요.' })
        .max(100, { message: '100개 이내로 입력해주세요.' }),
    )
    .refine(value => !isNaN(value), { message: '필수 입력 사항입니다.' }),
  studyTime: z
    .string()
    .min(1, '필수 입력 사항입니다.')
    .max(15, '15자 이내로 입력해주세요.'),
});

export const userSchema = z.object({
  baekjoonId: z.string().min(1, '필수 입력 사항입니다.'),
});
