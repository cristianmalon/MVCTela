using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class USUARIO : EntidadBase
    {
        [DataMember] public string SUsrId { get; set; }
        [DataMember] public string SUsrDsc { get; set; }
        [DataMember] public string SUsrPsw { get; set; }
        [DataMember] public string SUsrSTip { get; set; }
        [DataMember] public Int32? SGrpId { get; set; }
        [DataMember] public string SUsrPerId { get; set; }
        [DataMember] public string SUsrSAdS { get; set; }
        [DataMember] public string EmpCCodUs { get; set; }
        [DataMember] public string SUsrSEst { get; set; }
        [DataMember] public string SUsrULgCr1 { get; set; }
        [DataMember] public string SUsrWLgCr1 { get; set; }
        [DataMember] public DateTime? SUsrFLgCr1 { get; set; }
        [DataMember] public string SUsrHLgCr1 { get; set; }
        [DataMember] public string SUsrULgMo1 { get; set; }
        [DataMember] public string SUsrWLgMo1 { get; set; }
        [DataMember] public DateTime? SUsrFLgMo1 { get; set; }
        [DataMember] public string SUsrHLgMo1 { get; set; }
        [DataMember] public string SUsrULgAn1 { get; set; }
        [DataMember] public string SUsrWLgAn1 { get; set; }
        [DataMember] public DateTime? SUsrFLgAn1 { get; set; }
        [DataMember] public string SUsrHLgAn1 { get; set; }
        [DataMember] public string SUsrULgAc1 { get; set; }
        [DataMember] public string SUsrWLgAc1 { get; set; }
        [DataMember] public DateTime? SUsrFLgAc1 { get; set; }
        [DataMember] public string SUsrHLgAc1 { get; set; }
        [DataMember] public string SUsrSSSe { get; set; }
        [DataMember] public Int32? EplCCodUs { get; set; }
        [DataMember] public string SUsrPwdEnc { get; set; }
        [DataMember] public string SUsrPwdKey { get; set; }
        [DataMember] public DateTime? SUsrFUCmbC { get; set; }
        [DataMember] public Int32 EplCCod { get; set; }
        [DataMember] public string SUsrSPUs { get; set; }
        [DataMember] public string SUsrSMUs { get; set; }
        [DataMember] public string SUsrSCnf { get; set; }
        [DataMember] public string SUsrSASS { get; set; }
        [DataMember] public string sUsrSCampo { get; set; }
        [DataMember] public string SUsrDEma { get; set; }
        [DataMember] public Int32? SUsrNColor { get; set; }
        [DataMember] public Int32? SUsrNGrad { get; set; }
        [DataMember] public Nullable<byte> SUsrNVista { get; set; }
        [DataMember] public string SUSRCPLTCCOD { get; set; }
        [DataMember] public string SUSRSPLANTA { get; set; }
        //
        //[DataMember] public string EmpCCod { get; set; }
        [DataMember] public List<ROLES> ListaRoles { get; set; }
        [DataMember] public List<RUTAS> ListaRutas { get; set; }
        [DataMember] public List<SISTEMAS> ListaSistemas { get; set; }
        [DataMember] public string AUTHKEY { get; set; }
        [DataMember] public string CRITERIOFILTRO { get; set; }

        [DataMember]
        public Int64 SISTEMA_ID { get; set; }

        [DataMember] public string EplDNom { get; set; }
        [DataMember] public string EplDCgo { get; set; }
        [DataMember] public string EplDAre { get; set; }
        [DataMember] public string EplNTel1r { get; set; }
        [DataMember] public string RUTA_URL { get; set; }

        [DataMember] public string rutaID { get; set; }

        //[DataMember] public List<ENProyecto> ListaProyectos { get; set; }
        [DataMember] public int IdProyecto { get; set; }
        [DataMember] public string ProyectoNombre { get; set; }
        [DataMember] public string IPAcceso { get; set; }
        [DataMember] public string FunCCod { get; set; }
[DataMember] public string FunDDes { get; set; }
    }
}
