using System.ComponentModel.DataAnnotations;

namespace ProjectoTarea.Models;

public class Tarea
{
  [Key]
  public int TareaId { get; set; }
  public DateTime Fecha { get; set; }
  public string? Descripcion { get; set; }
  public PrioridadDeLaTarea Prioridad { get; set; }
  public bool Realizada { get; set; }
  public string? UsuarioId { get; set; }
}

public enum PrioridadDeLaTarea{
  baja = 1,
  media,
  alta
}
