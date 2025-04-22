using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.UtilGeneral
{
    public class CShrapEncryption
    {
        // This constant string is used as a "salt" value for the PasswordDeriveBytes function calls.
        // This size of the IV (in bytes) must = (keysize / 8).  Default keysize is 256, so the IV must be
        // 32 bytes long.  Using a 16 character string here gives us 32 bytes when converted to a byte array.
        private static readonly byte[] initVectorBytes = Encoding.ASCII.GetBytes("tu89geji340t89u2");

        // This constant is used to determine the keysize of the encryption algorithm.
        private const int keysize = 256;

        public static string EncryptString(string plainText, string passPhrase)
        {
            try
            {
                byte[] plainTextBytes = Encoding.UTF8.GetBytes(plainText);
                using (PasswordDeriveBytes password = new PasswordDeriveBytes(passPhrase, null))
                {
                    byte[] keyBytes = password.GetBytes(keysize / 8);
                    using (RijndaelManaged symmetricKey = new RijndaelManaged())
                    {
                        symmetricKey.Mode = CipherMode.CBC;
                        using (ICryptoTransform encryptor = symmetricKey.CreateEncryptor(keyBytes, initVectorBytes))
                        {
                            using (MemoryStream memoryStream = new MemoryStream())
                            {
                                using (CryptoStream cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                                {
                                    cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
                                    cryptoStream.FlushFinalBlock();
                                    byte[] cipherTextBytes = memoryStream.ToArray();
                                    //+ => -, / => _ and = => .
                                    return Convert.ToBase64String(cipherTextBytes).Replace('+', '-').Replace('/', '_').Replace('=', '.');
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
        public static string DecryptString(string cipherText, string passPhrase)
        {
            try
            {
                byte[] cipherTextBytes = Convert.FromBase64String(cipherText.Replace('-', '+').Replace('_', '/').Replace('.', '='));
                using (PasswordDeriveBytes password = new PasswordDeriveBytes(passPhrase, null))
                {
                    byte[] keyBytes = password.GetBytes(keysize / 8);
                    using (RijndaelManaged symmetricKey = new RijndaelManaged())
                    {
                        symmetricKey.Mode = CipherMode.CBC;
                        using (ICryptoTransform decryptor = symmetricKey.CreateDecryptor(keyBytes, initVectorBytes))
                        {
                            using (MemoryStream memoryStream = new MemoryStream(cipherTextBytes))
                            {
                                using (CryptoStream cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read))
                                {
                                    byte[] plainTextBytes = new byte[cipherTextBytes.Length];
                                    int decryptedByteCount = cryptoStream.Read(plainTextBytes, 0, plainTextBytes.Length);
                                    string dato = Encoding.UTF8.GetString(plainTextBytes, 0, decryptedByteCount);
                                    return dato;
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
        

        public static string SplitConcatStrEncrypt(string Str, string Delimit, string pstrEncryptionKey)
        {
            string ReturnStr = "";
            foreach (var objValue in Str.Split(new[] { Delimit }, StringSplitOptions.RemoveEmptyEntries))
            {
                ReturnStr = ReturnStr + EncryptString(objValue, pstrEncryptionKey) + ",";
            }
            return ReturnStr.TrimEnd(',');
        }
       
        public static string GenerateKey()
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789|$/.*!";
            var random = new Random();
            var result = new string(
                Enumerable.Repeat(chars, 100)
                          .Select(s => s[random.Next(s.Length)])
                          .ToArray());
            return result;
        }
    }
}
