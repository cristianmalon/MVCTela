using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class ENColaDespacho:EntidadBase
    {
        [DataMember] public int PrioridadCabera { get; set; }
        [DataMember] public int PrioridadDetalle { get; set; }
        [DataMember] public int PrioridadFinal { get; set; }
        [DataMember] public int? PrioridadFinalVisible { get; set; }
        [DataMember] public int EstadoComboCerrado { get; set; }
        [DataMember] public int EstadoCola { get; set; }
        [DataMember] public string OP { get; set; }
        [DataMember] public string ComboCamtexCodigo { get; set; }
        [DataMember] public string ComboCamtex { get; set; }
        [DataMember] public string ComboPlanta { get; set; }
        [DataMember] public string OFCorte { get; set; }
        [DataMember] public int CantidadHabilitada { get; set; }
        [DataMember] public int CantidadPendienteDespacho { get; set; }
        [DataMember] public decimal DiasStockCosturaLinea { get; set; }
        [DataMember] public decimal AcumuladoDiasStockCostura { get; set; }
        [DataMember] public int AuditoriaCalificacion { get; set; }
        [DataMember] public string AuditoriaCalificacionDescripcion { get; set; }
        [DataMember] public int AuditoriaRestriccion { get; set; }
        [DataMember] public string AuditoriaRestriccionDescripcion { get; set; }
        [DataMember] public int HabilitadoAvios { get; set; }
        [DataMember] public string HabilitadoDescripcion { get; set; }
        [DataMember] public int StockAptoDespachoCostura { get; set; }
        [DataMember] public string StockAptoDespachoCosturaDescripcion { get; set; }
        [DataMember] public int CierreComboStatus { get; set; }
        [DataMember] public string CierreComboStatusDescripcion { get; set; }
        [DataMember] public string ConcatIdDetalles { get; set; }
        
        [DataMember] public int IdxFrom { get; set; }
        [DataMember] public int IdxTo { get; set; }
        [DataMember] public int IdColaDespachoCabecera { get; set; }
        [DataMember] public int IdLinea { get; set; }

        [DataMember] public int IdColaDespachosDetalle { get; set; }
        [DataMember] public DateTime? FechaAPT { get; set; }
        [DataMember] public int Tipo { get; set; }
        [DataMember] public int EstadoAutorizadoPCPM { get; set; }

        [DataMember] public int IdMotivo { get; set; }
        [DataMember] public int IdTrabajador { get; set; }
        [DataMember] public string Clave { get; set; }
        [DataMember] public string Observaciones { get; set; }

        [DataMember] public int DCPO { get; set; }
        [DataMember] public int CmbOP { get; set; }
        [DataMember] public string ComboCliente { get; set; }
        [DataMember] public string ArteCliente { get; set; }
        [DataMember] public string POCliente { get; set; }
        [DataMember] public DateTime? FechaDespacho { get; set; }

        [DataMember] public int Opcion { get; set; }

    }
}
