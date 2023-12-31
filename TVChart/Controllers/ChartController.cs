﻿using Microsoft.AspNetCore.Mvc;
using TVChart.DAL.Models;
using TVChart.DTOs;
using TVChart.Services;

namespace TVChart.Controllers;

[Route("[controller]")]
[ApiController]
public class ChartController : ControllerBase
{
    private readonly ICandleService _service;
    public ChartController(ILogger<ChartController> logger, ICandleService service)
    {
        _service = service;
    }
    [HttpGet]
    public  IActionResult Get()
    {
        var candles =  _service.GetAllCandles();
        return Ok(candles);
    }
}

