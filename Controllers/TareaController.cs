using System.Diagnostics;
using System.Dynamic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ProjectoTarea.Data;
using ProjectoTarea.Models;

namespace ProjectoTarea.Controllers;

public class TareaController : Controller
{
    private readonly ILogger<TareaController> _logger;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<IdentityUser> _userManager;

    public TareaController(ILogger<TareaController> logger, ApplicationDbContext context, UserManager<IdentityUser> userManager)
    {
        _logger = logger;
        _context = context;
        _userManager = userManager;
    }

    public IActionResult Index()
    {
        return View();
    }

    public async Task<JsonResult> Guardar(int Id, DateTime Fecha, PrioridadDeLaTarea Prioridad, string Descripcion)
    {
        dynamic Error = new ExpandoObject();
        var user = await _userManager.GetUserAsync(User);
        if (Id == 0)
        {
            var tarea = new Tarea()
            {
                Fecha = Fecha,
                Prioridad = Prioridad,
                Descripcion = Descripcion,
                UsuarioId = user.Id,
                Realizada = false
            };
            _context.Tareas?.Add(tarea);
            await _context.SaveChangesAsync();
            Error.NonError = true;
            Error.Mensaje = "";
        }else{
            Error.NonError = false;
            Error.Mensaje = "Tarea no encontrada";
            var tarea = _context.Tareas?.Where(x => x.TareaId == Id && x.UsuarioId == user.Id).FirstOrDefault();
            if (tarea != null)
            {
                tarea.Descripcion = Descripcion;
                tarea.Fecha = Fecha;
                tarea.Prioridad = Prioridad;
                await _context.SaveChangesAsync();
                Error.NonError = true;
                Error.Mensaje = "";
            }
        }
        return Json(Error);
    }
}