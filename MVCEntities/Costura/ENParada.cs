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
    public class ENParada : EntidadBase
    {
        [DataMember] public int IdParada { get; set; }
        [DataMember] public int IdMaquina { get; set; }
        [DataMember] public int IdMotivo { get; set; }
        [DataMember] public List<ENMotivo> ListMotivo { get; set; }
        [DataMember] public string CodMecanico { get; set; }
        [DataMember] public List<ENProgramacionMecanico> ListPersonalMant { get; set; }
        [DataMember] public DateTime? RpmFIni { get; set; }
        [DataMember] public int RpmNReg { get; set; }
        [DataMember] public string COCCTurIn{ get; set; }
        [DataMember] public DateTime? RpmFFin { get; set; }
        [DataMember] public string PrcCCOD { get; set; }
        [DataMember] public string COCNTipOC { get; set; }
        [DataMember] public int COCNAnioOC{ get; set; }
        [DataMember] public int COCNNroOC { get; set; }
        [DataMember] public int COCNItmPaq{ get; set; }
        [DataMember] public string COCCCodTal{ get; set; }
        [DataMember] public int IdMotivoParada{ get; set; }
        [DataMember] public int RpmCPerMan { get; set; }
        [DataMember] public int RpmEstado { get; set; }
        [DataMember] public string RpmCTipFalla { get; set; }
        [DataMember] public DateTime? RpmFIniMecanico { get; set; }
    }
}
