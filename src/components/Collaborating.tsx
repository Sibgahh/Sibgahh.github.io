import logoTelkom from "@/logo/Company_Logo/TelkomSigma.webp";
import logoSummarecon from "@/logo/Company_Logo/Summarecon_Agung.svg";
import logoTriverie from "@/logo/Company_Logo/Logo_Triverie_PT.png";
import logoMain from "@/logo/Company_Logo/logo-main.png";
import logoFooter from "@/logo/Company_Logo/logofooter.png";
import logoNew from "@/logo/Company_Logo/newlogos.png";
import logoImg02 from "@/logo/Company_Logo/img-02.webp";
import logoHash from "@/logo/Company_Logo/680f3bfb25c9fae7ad98b43a61f90593.png";
import logoUmn from "@/logo/Company_Logo/Logo-UMN-e1634700898276 (1).png";
import logoSiloam from "@/logo/Company_Logo/Siloam_Hospitals.svg";

const companyLogos = [
  { src: logoTelkom, alt: "Telkomsigma" },
  { src: logoSummarecon, alt: "Summarecon Agung" },
  { src: logoTriverie, alt: "Triverie" },
  { src: logoUmn, alt: "UMN" },
  { src: logoSiloam, alt: "Siloam Hospitals" },
  { src: logoMain, alt: "Partner" },
  { src: logoFooter, alt: "Partner" },
  { src: logoNew, alt: "Partner" },
  { src: logoImg02, alt: "Partner" },
  { src: logoHash, alt: "Partner" },
];

export default function Collaborating() {
  const logoLoop = [...companyLogos, ...companyLogos];

  return (
    <section className="collab-section">
      <div className="collab-inner">
        <h2 className="collab-title">Collaborating with Industry Leaders</h2>
        <div className="collab-marquee" aria-label="Company logos">
          <div className="collab-track">
            {logoLoop.map((logo, i) => (
              <div key={`${logo.alt}-${i}`} className="collab-item">
                <img src={logo.src} alt={logo.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
