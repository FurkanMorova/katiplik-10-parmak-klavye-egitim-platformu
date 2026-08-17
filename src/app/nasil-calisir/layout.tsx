import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nasıl Çalışılır? | 10 Parmak ve Katiplik Sınavı Klavye Eğitimi',
  description:
    'On parmak klavye eğitiminde doğru oturuş, parmak yerleşimi ve Katiplik Sınavı hazırlık yöntemi hakkında bilmeniz gereken her şey. F ve Q klavye için bilimsel pratik rehberi.',
  keywords:
    '10 parmak klavye nasıl öğrenilir, katiplik sınavı klavye hazırlık, F klavye eğitim yöntemi, zabıt katipliği klavye çalışması, on parmak nasıl çalışılır',
  openGraph: {
    title: 'Nasıl Çalışılır? | ParmakAkademi',
    description: 'On parmak ve Katiplik Sınavı klavye çalışma rehberi.',
    type: 'article',
  },
};

export default function NasilCalisirLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
