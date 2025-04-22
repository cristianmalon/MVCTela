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
    public class EntidadBase
    {
        [DataMember] public int? IdSede { get; set; }
        //[DataMember] 
        public String SerialKey { get; set; }
        [DataMember]
        [Display(Name = "Estado")]        
        public String ESTADO { get; set; }
        [DataMember]
        [Display(Name = "Estado")]
        public int IdEstado { get; set; }
        [DataMember] public String ESTADO_DES { get; set; }
        [DataMember]
        [Display(Name = "Usuario Reg.")]
        public String USUARIO_REG { get; set; }
        [DataMember]
        [Display(Name = "Usuario Reg.")]
        public String SUSUARIO_REG { get; set; }
        [DataMember]
        [Display(Name = "F.Registro")]
        //[JsonProperty("date")]
        public DateTime? FECHA_REG { get; set; }
        [DataMember]
        [Display(Name = "PC Registro")]
        public String HOST_REG { get; set; }
        [DataMember]
        [Display(Name = "Usuario Act.")]
        public String USUARIO_ACT { get; set; }
        //[DataMember]
        [Display(Name = "Usuario Act.")]
        public string SUSUARIO_ACT { get; set; }
        //[DataMember]
        [Display(Name = "F.Actualizacion")]
        public DateTime? FECHA_ACT { get; set; }
        //[DataMember]
        [Display(Name = "PC Actualizacion")]
        public String HOST_ACT { get; set; }
        //[DataMember] 
        public List<EntidadEstado> ListaEstado { get; set; }
        //[DataMember] 
        public int PageSize { get; set; }
        //[DataMember] 
        public int PageNumber { get; set; }
        //[DataMember] 
        public int TotalPage { get; set; }
        //[DataMember] 
        public int RowNumber { get; set; }
        //[DataMember] 
        public int TotalRecords { get; set; }
        //[DataMember] 
        //public string IdEmpresa { get; set; }
        [DataMember] 
        public string EmpCCod { get; set; }
        
    }
}
