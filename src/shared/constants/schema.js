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
    .string()
    .min(1, '필수 입력 사항입니다.')
    .transform(value => +value.replace(/[^0-9]/g, ''))
    .refine(value => value <= 100, '100개 이내로 입력해주세요.')
    .refine(value => value > 0, '1개 이상으로 입력해주세요.'),
  studyTime: z
    .string()
    .min(1, '필수 입력 사항입니다.')
    .max(15, '15자 이내로 입력해주세요.'),
});

export const userSchema = z.object({
  baekjoonId: z.string().min(1, '필수 입력 사항입니다.'),
});
