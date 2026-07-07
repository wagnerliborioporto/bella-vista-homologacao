'use client';

import { useState } from 'react';
import { Download, LoaderCircle } from 'lucide-react';

type Props = {
  label: string;
  onDownload: () => void | Promise<void>;
};

export const PDFGenerator = ({ label, onDownload }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await onDownload();
    } catch (error) {
      console.error(error);
      window.alert('Não foi possível gerar o PDF agora. Atualize a página e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      disabled={loading}
      className='inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-[var(--gold)]/55 bg-[linear-gradient(135deg,rgba(201,161,58,0.16),rgba(201,161,58,0.06))] px-6 py-3 text-xs font-semibold text-[var(--gold)] shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:border-[var(--gold)] hover:bg-[rgba(201,161,58,0.2)] disabled:cursor-wait disabled:opacity-60'
    >
      {loading ? (
        <LoaderCircle className='h-4 w-4 animate-spin' aria-hidden='true' />
      ) : (
        <Download className='h-4 w-4' aria-hidden='true' />
      )}
      <span>{loading ? 'Gerando PDF profissional…' : label}</span>
    </button>
  );
};
