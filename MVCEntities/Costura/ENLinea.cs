using System.Runtime.Serialization;
namespace CAMTEX.Entidades
{
    public class ENLinea:EntidadBase
    {
        [DataMember] public int? IdUbicacion { get; set; }
        [DataMember] public int IdLinea { get; set; }
        [DataMember] public string Linea { get; set; }
        [DataMember] public string LineaCod { get; set; }
        [DataMember] public string ProveedorCod { get; set; }
        [DataMember] public string Proveedor { get; set; }
        [DataMember] public int IdProveedor { get; set; }
        [DataMember] public string LinCCod { get; set; }

        [DataMember] public string Supervisor { get; set; }
        [DataMember] public string Habilitador { get; set; }

    }

    public class ENProveedor : EntidadBase
    {
        [DataMember] public int IdProveedor { get; set; }
        [DataMember] public string ProveedorCod { get; set; }
        [DataMember] public string Proveedor { get; set; }
        [DataMember] public int PlantaServicio { get; set; }
    }
}
