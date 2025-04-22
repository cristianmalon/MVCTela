using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class RegProd
    {
        [DataMember] public string EmpCCod { get; set; }
        [DataMember] public string Maquina { get; set; }
        [DataMember] public string NombreMaquina { get; set; }
        [DataMember] public string TipoMaquina { get; set; }
        [DataMember] public string FechaInicio { get; set; }        
        [DataMember] public string NumRegProd { get; set; }
        [DataMember] public string ProcesoCod { get; set; }
        [DataMember] public string FechaFin { get; set; }
        [DataMember] public string CodSupervisor { get; set; }
        [DataMember] public string ClaveSupervisor { get; set; }
        [DataMember] public string CodOperario { get; set; }
        [DataMember] public string CodAyudante { get; set; }
        [DataMember] public string Observacion { get; set; }
        [DataMember] public string TotalKilos { get; set; }
        [DataMember] public string TotalRollos { get; set; }
        [DataMember] public string OFaCTDc { get; set; }
        [DataMember] public int OFaNAno { get; set; }
        [DataMember] public string OFaNNro { get; set; }

        [DataMember] public string OFaCTDcPP { get; set; }
        [DataMember] public string OFaNAnoPP { get; set; }
        [DataMember] public string OFaNNroPP { get; set; }

        [DataMember] public string PedidoTextilTipo { get; set; }
        [DataMember] public string PedidoTextilAnio { get; set; }
        [DataMember] public string PedidoTextilNro { get; set; }
        [DataMember] public string Color { get; set; }
        [DataMember] public string Reproceso { get; set; }
        [DataMember] public string Partida { get; set; }
        [DataMember] public string Estacion { get; set; }
        [DataMember] public string Usuario { get; set; }

        [DataMember] public int IsAbierta { get; set; }

        [DataMember] public string Supervisor { get; set; }
        [DataMember] public string Operario { get; set; }
        [DataMember] public string Ayudante { get; set; }

        [DataMember] public string Parametros { get; set; }

        [DataMember] public string CodigoMotivo { get; set; }
        [DataMember] public string CodigoMotivoEspecifico { get; set; }
        [DataMember] public string EsParada { get; set; }
        [DataMember] public string FlagInicioFin { get; set; }

        [DataMember] public string MotivoParadaCod { get; set; }
        [DataMember] public string MotivoParada { get; set; }

        [DataMember] public string MotivoEspecificoParadaCod { get; set; }
        [DataMember] public string MotivoEspecificoParada { get; set; }

        [DataMember] public string TiempoTeorico { get; set; }
        [DataMember] public string PersonalMantenimientoCodigo { get; set; }
        [DataMember] public int MinutosParada { get; set; }

        [DataMember] public int MotivoPrevio { get; set; }
        //[DataMember] public string TiempoTeorico { get; set; }

        //[DataMember] public DateTime HORAINI { get; set; }
        //[DataMember] public DateTime HORAFIN { get; set; }
        //[DataMember] public int TURNO { get; set; }
        //[DataMember] public string PROCESO { get; set; }
        //[DataMember] public string PARADA { get; set; }
        //[DataMember] public string OPEINI { get; set; }
        //[DataMember] public string OPEFIN { get; set; }
        //[DataMember] public string FPRODDUCCION { get; set; }
        //[DataMember] public string ESTACION { get; set; }
        //[DataMember] public string CodTela { get; set; }
        //[DataMember] public string TelaDescripcion { get; set; }
        //[DataMember] public string Pedido { get; set; }

    }
}
