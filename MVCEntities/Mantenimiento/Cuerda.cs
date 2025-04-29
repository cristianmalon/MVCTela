using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class Cuerda
    {
        [DataMember] public string EmpCCod { get; set; }
		[DataMember] public string OFaCTDc { get; set; }
		[DataMember] public int OFaNAno { get; set; }
		[DataMember] public string OFaNNro { get; set; }
		[DataMember] public string OfaNroCuer { get; set; }
		[DataMember] public string OFACueStckI { get; set; }
		[DataMember] public string OFACuePar { get; set; }


		[DataMember] public int Rollos { get; set; }
		[DataMember] public decimal Peso { get; set; }

		[DataMember] public string MaqCCod { get; set; }
		[DataMember] public string TipoTenidoCodigo { get; set; }

		
		//       EmpCCod	,
		//OFaCTDc	,
		//OFaNAno	,
		//OFaNNro	,
		//OfaNroCuer,
		//OFACueStckI,
		//OFACuePar,
	}
}
