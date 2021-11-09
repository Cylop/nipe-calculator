import { Router } from "express";
import calculate from "./calculate";

const router = Router();

router.use("/calculate", calculate);

router.get("/ping", (req, res) => {
    res.status(200).json({
      status: "success",
      message: "All systems are up and running",
    });
});

export default router;