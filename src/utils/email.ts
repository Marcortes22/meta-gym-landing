import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export interface EmailResponse {
  success: boolean;
  data?: any;
  error?: any;
}

export async function sendWelcomeEmail(email: string, name: string): Promise<EmailResponse> {
  try {
    console.log('Enviando email de bienvenida a:', email);
    
    const { data, error } = await resend.emails.send({
      from: 'Meta Gym <onboarding@brandondev.me>', 
      to: [email],
      subject: '🎉 ¡Bienvenido a Meta Gym!',
      html: `
        <div style="background-color: #0e0e10; color: #fefefe; padding: 40px; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #e04a36, #fe6b24); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <span style="font-size: 36px; color: white;">🏋️</span>
              </div>
              <h1 style="color: #fe6b24; margin: 0;">¡Bienvenido ${name}!</h1>
            </div>
            
            <div style="background: #1a1a1d; border: 1px solid #262626; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
              <p style="color: #d4d4d4; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
                Gracias por elegir <strong style="color: #fe6b24;">Meta Gym</strong> para transformar tu gimnasio en un negocio profesional.
              </p>
              <p style="color: #a3a3a3; font-size: 14px; margin: 0;">
                En los próximos minutos recibirás las instrucciones para comenzar tu setup.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a 
                href="https://app.metagym.com/setup" 
                style="background: linear-gradient(90deg, #e04a36, #fe6b24); color: #fefefe; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;"
              >
                Comenzar Setup
              </a>
            </div>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error };
    }

    console.log('Email de bienvenida enviado exitosamente, ID:', data?.id);
    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, error };
  }
}

export async function addToNewsletter(email: string): Promise<EmailResponse> {
  try {
    console.log('Enviando email de newsletter a:', email);
    
    const { data, error } = await resend.emails.send({
      from: 'Meta Gym <noreply@brandondev.me>', 
      to: [email],
      subject: '✅ Confirmación de suscripción - Meta Gym Newsletter',
      html: `
        <div style="background-color: #0e0e10; color: #fefefe; padding: 40px; font-family: Arial, sans-serif;">
          <div style="max-width: 500px; margin: 0 auto;">
            
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #e04a36, #fe6b24); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <span style="font-size: 36px;">🎉</span>
              </div>
              <h2 style="color: #fe6b24; margin: 0; font-size: 24px;">¡Suscripción Confirmada!</h2>
            </div>

            <div style="background: #1a1a1d; border: 1px solid #262626; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
              <p style="color: #d4d4d4; margin: 0 0 15px 0; font-size: 16px; line-height: 1.5;">
                ¡Genial! Ya formas parte de la comunidad <strong style="color: #fe6b24;">Meta Gym</strong>.
              </p>
              <p style="color: #a3a3a3; margin: 0; font-size: 14px; line-height: 1.5;">
                Recibirás tips exclusivos, casos de éxito y las últimas actualizaciones sobre gestión de gimnasios.
              </p>
            </div>

            <div style="background: #141414; padding: 20px; border-radius: 8px; border: 1px solid #262626; text-align: center;">
              <h3 style="color: #fe6b24; margin: 0 0 15px 0; font-size: 18px;">¿Qué puedes esperar?</h3>
              <ul style="list-style: none; padding: 0; margin: 0; color: #a3a3a3; font-size: 14px;">
                <li style="margin-bottom: 8px;">📊 Estrategias para aumentar retención</li>
                <li style="margin-bottom: 8px;">💡 Tips de automatización</li>
                <li style="margin-bottom: 8px;">🚀 Nuevas funcionalidades</li>
                <li style="margin: 0;">💰 Casos de éxito reales</li>
              </ul>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a 
                href="https://metagym.app" 
                style="background: linear-gradient(90deg, #e04a36, #fe6b24); color: #fefefe; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-size: 14px; display: inline-block;"
              >
                Visitar Meta Gym
              </a>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #262626; text-align: center;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                Puedes cancelar tu suscripción en cualquier momento.
              </p>
            </div>
            
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Error sending newsletter confirmation:', error);
      return { success: false, error };
    }

    console.log('Email enviado exitosamente, ID:', data?.id);
    return { success: true, data };
    
  } catch (error) {
    console.error('Error en servicio de email:', error);
    return { success: false, error };
  }
}

export async function sendContactFormEmail(
  name: string, 
  email: string, 
  message: string, 
  phone?: string
): Promise<EmailResponse> {
  try {
    console.log('Enviando formulario de contacto de:', email);
    
    const { data, error } = await resend.emails.send({
      from: 'Meta Gym Contact <contact@brandondev.me>', 
      to: ['brandoncarrilloalvarez2@gmail.com'], 
      subject: `📧 Nuevo mensaje de contacto - ${name}`,
      html: `
        <div style="background-color: #0e0e10; color: #fefefe; padding: 40px; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto;">
            
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #fe6b24; margin: 0;">Nuevo mensaje de contacto</h2>
            </div>

            <div style="background: #1a1a1d; border: 1px solid #262626; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
              <h3 style="color: #fe6b24; margin: 0 0 15px 0;">Información del contacto:</h3>
              <p style="color: #d4d4d4; margin: 5px 0;"><strong>Nombre:</strong> ${name}</p>
              <p style="color: #d4d4d4; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              ${phone ? `<p style="color: #d4d4d4; margin: 5px 0;"><strong>Teléfono:</strong> ${phone}</p>` : ''}
            </div>

            <div style="background: #141414; padding: 20px; border-radius: 8px; border: 1px solid #262626;">
              <h3 style="color: #fe6b24; margin: 0 0 15px 0;">Mensaje:</h3>
              <p style="color: #d4d4d4; font-size: 14px; line-height: 1.6; margin: 0;">${message}</p>
            </div>

            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #262626; text-align: center;">
              <p style="color: #a3a3a3; font-size: 12px; margin: 0;">
                Enviado desde el formulario de contacto de Meta Gym
              </p>
            </div>
            
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Error sending contact form email:', error);
      return { success: false, error };
    }

    console.log('Email de contacto enviado exitosamente, ID:', data?.id);
    return { success: true, data };
  } catch (error) {
    console.error('Error en servicio de contacto:', error);
    return { success: false, error };
  }
}

// Email de confirmación de registro con instrucciones de pago
export async function sendRegistroConfirmacion(
  adminEmail: string,
  adminName: string,
  gymName: string,
  planName: string,
  planPrice: number,
  tenantId: string
): Promise<EmailResponse> {
  try {
    console.log('Enviando email de confirmación de registro a:', adminEmail);
    
    const { data, error } = await resend.emails.send({
      from: 'Meta Gym <registro@brandondev.me>',
      to: [adminEmail],
      subject: '🎉 ¡Registro completado! Instrucciones para activar tu cuenta',
      html: `
        <div style="background-color: #0e0e10; color: #fefefe; padding: 40px; font-family: Arial, sans-serif;">
          <div style="max-width: 650px; margin: 0 auto;">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px;">
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #e04a36, #fe6b24); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <span style="font-size: 36px; color: white;">🎉</span>
              </div>
              <h1 style="color: #fe6b24; margin: 0; font-size: 28px;">¡Registro Completado!</h1>
              <p style="color: #a3a3a3; font-size: 16px; margin: 10px 0 0 0;">
                Bienvenido a Meta Gym, ${adminName}
              </p>
            </div>

            <!-- Información del registro -->
            <div style="background: #1a1a1d; border: 1px solid #262626; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
              <h2 style="color: #fefefe; margin: 0 0 20px 0; font-size: 20px;">📋 Resumen de tu registro:</h2>
              
              <div style="display: grid; gap: 15px;">
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #404040;">
                  <span style="color: #a3a3a3;">Gimnasio:</span>
                  <span style="color: #fefefe; font-weight: 600;">${gymName}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #404040;">
                  <span style="color: #a3a3a3;">Administrador:</span>
                  <span style="color: #fefefe; font-weight: 600;">${adminName}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #404040;">
                  <span style="color: #a3a3a3;">Plan seleccionado:</span>
                  <span style="color: #fe6b24; font-weight: 600;">${planName}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 10px 0;">
                  <span style="color: #a3a3a3;">Precio mensual:</span>
                  <span style="color: #22c55e; font-weight: 700; font-size: 18px;">$${planPrice}/mes</span>
                </div>
              </div>
            </div>

            <!-- Instrucciones de pago -->
            <div style="background: #141414; border: 2px solid #fe6b24; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
              <h2 style="color: #fe6b24; margin: 0 0 20px 0; font-size: 20px;">💳 ¿Cómo activar tu cuenta?</h2>
              
              <div style="margin-bottom: 25px;">
                <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                  <div style="width: 24px; height: 24px; background: #fe6b24; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; flex-shrink: 0; margin-top: 2px;">1</div>
                  <div>
                    <h3 style="color: #fefefe; margin: 0 0 5px 0; font-size: 16px;">Realiza la transferencia</h3>
                    <p style="color: #d4d4d4; margin: 0; font-size: 14px;">Transfiere $${planPrice} a nuestra cuenta bancaria</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                  <div style="width: 24px; height: 24px; background: #fe6b24; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; flex-shrink: 0; margin-top: 2px;">2</div>
                  <div>
                    <h3 style="color: #fefefe; margin: 0 0 5px 0; font-size: 16px;">Envía el comprobante</h3>
                    <p style="color: #d4d4d4; margin: 0; font-size: 14px;">Responde a este email con el comprobante de pago</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: flex-start;">
                  <div style="width: 24px; height: 24px; background: #fe6b24; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; flex-shrink: 0; margin-top: 2px;">3</div>
                  <div>
                    <h3 style="color: #fefefe; margin: 0 0 5px 0; font-size: 16px;">¡Listo para usar!</h3>
                    <p style="color: #d4d4d4; margin: 0; font-size: 14px;">Activamos tu cuenta en 24 horas</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Datos bancarios -->
            <div style="background: #1a1a1d; border: 1px solid #404040; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
              <h3 style="color: #fefefe; margin: 0 0 15px 0;">🏦 Datos para transferencia:</h3>
              
              <div style="background: #0e0e10; border-radius: 8px; padding: 20px; border-left: 4px solid #fe6b24;">
                <div style="margin-bottom: 8px;">
                  <span style="color: #a3a3a3; font-size: 14px;">Banco:</span>
                  <span style="color: #fefefe; font-weight: 600; margin-left: 10px;">Banco Nacional de Costa Rica</span>
                </div>
                <div style="margin-bottom: 8px;">
                  <span style="color: #a3a3a3; font-size: 14px;">Cuenta IBAN:</span>
                  <span style="color: #fefefe; font-weight: 600; margin-left: 10px; font-family: monospace;">CR05015202001234567890</span>
                </div>
                <div style="margin-bottom: 8px;">
                  <span style="color: #a3a3a3; font-size: 14px;">Cuenta Cliente:</span>
                  <span style="color: #fefefe; font-weight: 600; margin-left: 10px; font-family: monospace;">200-01-234-567890</span>
                </div>
                <div>
                  <span style="color: #a3a3a3; font-size: 14px;">Beneficiario:</span>
                  <span style="color: #fefefe; font-weight: 600; margin-left: 10px;">Meta Gym Solutions S.A.</span>
                </div>
              </div>
              
              <div style="margin-top: 15px; padding: 15px; background: #fee2e2; border-radius: 8px;">
                <p style="color: #991b1b; margin: 0; font-size: 14px; font-weight: 600;">
                  📌 <strong>Importante:</strong> Incluye en la descripción: "MetaGym-${tenantId.slice(-8)}" para identificar tu pago
                </p>
              </div>
            </div>

            <!-- Contacto -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h3 style="color: #fefefe; margin: 0 0 10px 0;">¿Tienes preguntas?</h3>
              <p style="color: #a3a3a3; margin: 0 0 20px 0;">Estamos aquí para ayudarte</p>
              
              <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                <a href="mailto:soporte@brandondev.me" style="background: linear-gradient(90deg, #e04a36, #fe6b24); color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-size: 14px; display: inline-flex; align-items: center;">
                  📧 soporte@brandondev.me
                </a>
                <a href="https://wa.me/50688888888" style="background: #25d366; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-size: 14px; display: inline-flex; align-items: center;" target="_blank">
                  💬 WhatsApp
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #262626;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                Gracias por elegir Meta Gym para profesionalizar tu gimnasio
              </p>
            </div>
            
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Error sending registro confirmation:', error);
      return { success: false, error };
    }

    console.log('Email de confirmación de registro enviado exitosamente, ID:', data?.id);
    return { success: true, data };
  } catch (error) {
    console.error('Error en confirmación de registro:', error);
    return { success: false, error };
  }
}