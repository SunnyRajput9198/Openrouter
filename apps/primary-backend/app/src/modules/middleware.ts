

export const middleware = async (req: any, res: any, next: any) => {
  try {
    await next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};