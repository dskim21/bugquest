# 데이터 모델

## ErrorLog

```js
{
  id: string,
  title: string,
  errorMessage: string,
  situation: string,
  cause: string,
  solution: string,
  tags: string[],
  difficulty: "easy" | "normal" | "hard",
  aiExplanation: string,
  createdAt: string,
  updatedAt: string
}

{
  id: string,
  title: string,
  description: string,
  relatedTag: string,
  xp: number,
  completed: boolean,
  createdAt: string
}

{
  level: number,
  xp: number,
  streak: number,
  totalLogs: number,
  completedQuests: number
}