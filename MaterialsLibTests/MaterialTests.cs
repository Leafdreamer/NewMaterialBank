using Microsoft.VisualStudio.TestTools.UnitTesting;
using MaterialsLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MaterialsLibTests
{
    [TestClass()]
    public class MaterialTests
    {
        [TestMethod()]
        public void ValidateNameTest()
        {
            User u1 = new User(1, "admin@email.com", "1234", true);

            Material m1 = new Material(1, 1, "Steel Bar", "Metal", 2, "Small, Thingy", "", u1);
            Material m2 = new Material(2, 1, "", "Metal", 8, "Test Description", "", u1);

            // m1 contains a Valid Name, m2 does not
            m1.ValidateName();
            Assert.ThrowsException<ArgumentException>(() => m2.ValidateName());
        }

        [TestMethod()]
        public void ValidateTypeTest()
        {
            User u1 = new User(1, "admin@email.com", "1234", true);

            Material m1 = new Material(1, 1, "Steel Bar", "Metal", 2, "Small, Thingy", "", u1);
            Material m2 = new Material(2, 1, "Steel Bar", "", 8, "Test Description", "", u1);

            // m1 contains a Valid Type, m2 does not
            m1.ValidateType();
            Assert.ThrowsException<ArgumentException>(() => m2.ValidateType());
        }

        [TestMethod()]
        public void ValidateAmountTest()
        {
            User u1 = new User(1, "admin@email.com", "1234", true);

            Material m1 = new Material(1, 1, "Steel Bar", "Metal", 1, "Small, Thingy", "", u1);
            Material m2 = new Material(2, 1, "Steel Bar", "Metal", 0, "Test Description", "", u1);
            Material m3 = new Material(3, 2, "Steel Bar", "Metal", -1, "Void", "", u1);

            // m1 and m2 contain a valid amount, m3 does not
            m1.ValidateAmount();
            m2.ValidateAmount();
            Assert.ThrowsException<ArgumentOutOfRangeException>(() => m3.ValidateAmount());
        }

        [TestMethod()]
        public void ValidateEmailTest()
        {
            User u1 = new User(1, "admin@email.com", "1234", true);
            User u2 = new User(1, "adminATemail.com", "1234", true);
            User u3 = new User(1, "admin@emailDOTcom", "1234", true);

            // u1 contains a valid e-mail, u2 and u3 do not
            u1.ValidateEmail();
            Assert.ThrowsException<ArgumentException>(() => u2.ValidateEmail());
            Assert.ThrowsException<ArgumentException>(() => u3.ValidateEmail());
        }

        [TestMethod()]
        public void ValidatePasswordTest()
        {
            User u1 = new User(1, "admin@email.com", "1234", true);
            User u2 = new User(1, "admin@email.com", "123", true);

            // u1 contains a valid password, u2 does not
            u1.ValidateEmail();
            Assert.ThrowsException<ArgumentException>(() => u2.ValidatePassword());
        }

    }
}