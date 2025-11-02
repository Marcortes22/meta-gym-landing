import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
  planName: string;
}

export default function RegisterModal({ isOpen, onClose, planId, planName }: RegisterModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    admin_name: '',
    admin_surname1: '',
    admin_surname2: '',
    admin_phone: '',
    email: '',
    company_name: '',
    gym_name: '',
    gym_phone: '',
    gym_address: '',
  });

  // Animar entrada del modal
  useEffect(() => {
    if (isOpen) {
      const modal = document.getElementById('register-modal-react');
      const content = modal?.querySelector('.modal-content');
      if (content) {
        gsap.from(content, {
          scale: 0.9,
          opacity: 0,
          duration: 0.3,
          ease: 'back.out(1.7)',
        });
      }
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      formDataToSend.append('requested_plan', planId);
      formDataToSend.append('name', formData.admin_name);
      formDataToSend.append('state', 'pending');
      formDataToSend.append('date', new Date().toISOString());

      const response = await fetch('/api/register-request', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        showMessage('¡Solicitud enviada con éxito! Te contactaremos pronto.', 'success');
        setTimeout(() => {
          resetForm();
          onClose();
        }, 1500);
      } else {
        throw new Error(result.message || 'Error al enviar solicitud');
      }
    } catch (error) {
      console.error('Register error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error al procesar la solicitud';
      showMessage(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      admin_name: '',
      admin_surname1: '',
      admin_surname2: '',
      admin_phone: '',
      email: '',
      company_name: '',
      gym_name: '',
      gym_phone: '',
      gym_address: '',
    });
  };

  const handleClose = () => {
    const modal = document.getElementById('register-modal-react');
    const content = modal?.querySelector('.modal-content');
    if (content) {
      gsap.to(content, {
        scale: 0.9,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          resetForm();
          onClose();
        },
      });
    } else {
      resetForm();
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      id="register-modal-react"
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="modal-container">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h3 className="modal-title">
              Solicitar Plan <span id="modal-plan-name">{planName}</span>
            </h3>
            <button
              onClick={handleClose}
              className="close-button"
              aria-label="Cerrar"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="modal-form">
            {/* Información del Administrador */}
            <div className="form-section">
              <h4 className="section-title">Información del Administrador</h4>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="admin_name">Nombre *</label>
                  <input
                    type="text"
                    id="admin_name"
                    name="admin_name"
                    className="form-input"
                    placeholder="Juan"
                    required
                    value={formData.admin_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="admin_surname1">Primer Apellido *</label>
                  <input
                    type="text"
                    id="admin_surname1"
                    name="admin_surname1"
                    className="form-input"
                    placeholder="Pérez"
                    required
                    value={formData.admin_surname1}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="admin_surname2">Segundo Apellido</label>
                  <input
                    type="text"
                    id="admin_surname2"
                    name="admin_surname2"
                    className="form-input"
                    placeholder="López"
                    value={formData.admin_surname2}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="admin_phone">Teléfono *</label>
                  <input
                    type="tel"
                    id="admin_phone"
                    name="admin_phone"
                    className="form-input"
                    placeholder="555-8888"
                    required
                    value={formData.admin_phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="juan@nuevogym.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Información del Gimnasio */}
            <div className="form-section">
              <h4 className="section-title">Información del Gimnasio</h4>

              <div className="form-group">
                <label htmlFor="company_name">Nombre de la Empresa *</label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  className="form-input"
                  placeholder="Gimnasio Fitness Pro"
                  required
                  value={formData.company_name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="gym_name">Nombre del Gimnasio *</label>
                <input
                  type="text"
                  id="gym_name"
                  name="gym_name"
                  className="form-input"
                  placeholder="Fitness Pro Centro"
                  required
                  value={formData.gym_name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="gym_phone">Teléfono del Gimnasio *</label>
                  <input
                    type="tel"
                    id="gym_phone"
                    name="gym_phone"
                    className="form-input"
                    placeholder="555-9999"
                    required
                    value={formData.gym_phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gym_address">Dirección *</label>
                  <input
                    type="text"
                    id="gym_address"
                    name="gym_address"
                    className="form-input"
                    placeholder="Av. Central 456"
                    required
                    value={formData.gym_address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Enviando...</span>
                </>
              ) : (
                <span>Enviar Solicitud</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Función para mostrar mensajes
function showMessage(message: string, type: 'success' | 'error') {
  const existingMessage = document.querySelector('.notification-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageDiv = document.createElement('div');
  messageDiv.className = `notification-message fixed top-4 right-4 z-[10000] p-4 rounded-lg shadow-lg transition-all duration-300 ${
    type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
  }`;
  messageDiv.innerHTML = `
    <div class="flex items-center space-x-2">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        ${
          type === 'success'
            ? '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />'
            : '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />'
        }
      </svg>
      <span>${message}</span>
    </div>
  `;

  document.body.appendChild(messageDiv);

  gsap.from(messageDiv, {
    x: 100,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.out',
  });

  setTimeout(() => {
    gsap.to(messageDiv, {
      x: 100,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => messageDiv.remove(),
    });
  }, 5000);
}
