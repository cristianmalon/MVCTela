using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class ENProduccionCostura : EntidadBase
    {
        [DataMember] public int IdProduccion { get; set; }
        [DataMember] public int IdMaquina { get; set; }
        [DataMember] public int anio { get; set; }
        [DataMember] public int Corte { get; set; }
        [DataMember] public string OPNro { get; set; }
        [DataMember] public string Corte_string { get; set; }
        [DataMember] public string ComboCliente { get; set; }
        [DataMember] public string ComboCamtex { get; set; }
        [DataMember] public string Recurso { get; set; }
        [DataMember] public string Maquinista { get; set; }
        [DataMember] public string Supervisor { get; set; }
        [DataMember] public string Linea { get; set; }
        [DataMember] public int IdLinea { get; set; }
        [DataMember] public string Min { get; set; }
        [DataMember] public string PdasHr { get; set; }
        [DataMember] public string IP { get; set; }
        
        [DataMember] public string CantPrendas { get; set; }

        [DataMember] public string TipoMaquina { get; set; }
        [DataMember] public string COCNTIPOC { get; set; }
        [DataMember] public string CodOperacion { get; set; }
        [DataMember] public List<ENOperacion> ListOperacion { get; set; }
        [DataMember] public List<ENCorte> ListCorte { get; set; }
        [DataMember] public string TMICCod { get; set; }
        [DataMember] public int IdParada { get; set; }
        [DataMember] public int IdTablet { get; set; }
        [DataMember] public string RpmCTipFalla { get; set; }
        [DataMember] public string HI { get; set; }
        [DataMember] public DateTime? FechaHora { get; set; }
    }
    [DataContract]
    public class ENOperacion
    {
        [DataMember] public string CodOperacion { get; set; }
        [DataMember] public string Descripcion { get; set; }
        [DataMember] public string TIEMPOESTANDAR { get; set; }
        [DataMember] public string TIEMPOTEORICO { get; set; }
        [DataMember] public string PRENDASHORA { get; set; }
    }
    [DataContract]
    public class ENPaquetes
    {
        [DataMember] public string Talla { get; set; }
        [DataMember] public int Paquete { get; set; }
        [DataMember] public int CantidadPrendas { get; set; }
        [DataMember] public int Estado { get; set; }

        [DataMember] public string opcion { get; set; }
        [DataMember] public string EmpCCod { get; set; }
        [DataMember] public string COCNTIPOC { get; set; }
        [DataMember] public int COCNANIOOC { get; set; }
        [DataMember] public int COCNNROOC { get; set; }
        [DataMember] public string COCCCODTAL { get; set; }
        [DataMember] public int COCNITMPAQ { get; set; }
        [DataMember] public int HJONOCMB { get; set; }
        [DataMember] public int HJONITM { get; set; }
        [DataMember] public DateTime? WFPROCE { get; set; }
        [DataMember] public int WCTRABA { get; set; }
        [DataMember] public string WCLNPRD { get; set; }
        [DataMember] public string USUARIO_REG { get; set; }
        [DataMember] public string HOST_REG { get; set; }
        [DataMember] public int IdTablet { get; set; }
        [DataMember] public int IdMaquina { get; set; }

        [DataMember] public int CODESTPROCLEC { get; set; }
        [DataMember] public DateTime? FECINIPROCLEC { get; set; }
        [DataMember] public DateTime? FECFINPROCLEC { get; set; }

    }

    [DataContract]
    public class ENCorte
    {
        [DataMember] public int Prioridad { get; set; }
        [DataMember] public int anio { get; set; }
        [DataMember] public int Corte { get; set; }
        [DataMember] public string Corte_string { get; set; }
    }
}
