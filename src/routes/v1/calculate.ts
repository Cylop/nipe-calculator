import { Router } from "express";

import { isObject, isArray } from "lodash";

const Formula = require('fparser');

const exactMath = require("exact-math");

const router = Router();

router.post("/equation", async (req, res) => {
    console.log(req.body);
    if(!req.body?.equation) {
      res.status(400).json({
        status: "error",
        message: "Equation (equation) must be provided in body in order to calculate result"
      });
      return;
    }
  
    const equation = req.body.equation;
    let result;
    try {
      result = await exactMath.formula(equation);
    }catch {
      res.status(400).json({
        status: "error",
        message: "Equation (equation) contains unallowed characters"
      });
      return;
    }
    
    res.status(200).json({
      equation,
      result,
    })
  });
  
  router.post("/formula", async (req, res) => {
    console.log(req.body);
    if(!req.body?.formula) {
      res.status(400).json({
        status: "error",
        message: "Formula (formula) must be provided in body in order to calculate result"
      });
      return;
    }
  
    if(!req.body.variables) {
      res.status(400).json({
        status: "error",
        message: "Variables (variables) must be provided in body in order to calculate result"
      });
      return;
    }
  
    const variables = req.body.variables;
    if (!(isObject(variables) || isArray(variables))) {
      res.status(400).json({
        status: "error",
        message: "Variables (variables) must be an object or an array containing objects with the needed variables for the formula"
      });
      return;
    } 
  
    const formula = req.body.formula;
  
    let result;
    try {
      const formulaObj = new Formula(formula);
      result = formulaObj.evaluate(variables);
    }catch(err) {
      console.log("Error occurred", err);
      res.status(400).json({
        status: "error",
        message: "Some error occurred, please try again"
      });
      return;
    }
    
    res.status(200).json({
      formula,
      variables,
      result,
    })
  });

export default router;