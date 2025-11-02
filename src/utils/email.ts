import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export interface EmailResponse {
  success: boolean;
  data?: any;
  error?: any;
}

export async function sendWelcomeEmail(email: string, gym_name: string): Promise<EmailResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Meta Gym <onboarding@brandondev.me>', 
      to: [email],
      subject: 'Solicitud Recibida - Meta Gym',
      html: `
        <div style="background-color: #0e0e10; color: #fefefe; padding: 40px; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #fe6b24; margin: 0 0 10px 0; font-size: 28px;">¡Solicitud Recibida!</h1>
              <p style="color: #a3a3a3; margin: 0; font-size: 16px;">${gym_name}</p>
            </div>
            
            <div style="background: #1a1a1d; border: 1px solid #262626; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
              <p style="color: #d4d4d4; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
                ¡Excelente! Hemos recibido tu solicitud para unirte a <strong style="color: #fe6b24;">Meta Gym</strong>.
              </p>
              <p style="color: #a3a3a3; font-size: 14px; margin: 0; line-height: 1.6;">
                Nuestro equipo está revisando tu información y pronto recibirás un correo con las <strong style="color: #d4d4d4;">instrucciones de pago</strong> para activar tu cuenta.
              </p>
            </div>
            
            <div style="background: rgba(254, 107, 36, 0.1); border: 1px solid rgba(254, 107, 36, 0.3); border-radius: 8px; padding: 20px; margin-bottom: 25px;">
              <h3 style="color: #fe6b24; margin: 0 0 15px 0; font-size: 18px; text-align: center;">
                📋 Próximos pasos
              </h3>
              <div style="color: #d4d4d4; font-size: 14px; line-height: 1.8;">
                <div style="margin-bottom: 12px; padding-left: 10px;">
                  <div style="color: #fe6b24; font-weight: bold; margin-bottom: 4px;">Revisión de información</div>
                  <div style="color: #a3a3a3;">Verificaremos los datos de tu gimnasio y plan seleccionado</div>
                </div>
                <div style="margin-bottom: 12px; padding-left: 10px;">
                  <div style="color: #fe6b24; font-weight: bold; margin-bottom: 4px;">Email con instrucciones de pago</div>
                  <div style="color: #a3a3a3;">Te enviaremos los detalles y métodos de pago disponibles</div>
                </div>
                <div style="margin-bottom: 12px; padding-left: 10px;">
                  <div style="color: #fe6b24; font-weight: bold; margin-bottom: 4px;">Activación de cuenta</div>
                  <div style="color: #a3a3a3;">Una vez confirmado el pago, activaremos tu cuenta inmediatamente</div>
                </div>
              </div>
            </div>

            <div style="background: linear-gradient(135deg, #1a1a1d 0%, #141414 100%); border: 2px solid #fe6b24; border-radius: 12px; padding: 25px; text-align: center; margin-bottom: 25px;">
              <div style="margin-bottom: 15px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fe6b24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block;">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <h4 style="color: #fefefe; margin: 0 0 10px 0; font-size: 18px; font-weight: bold;">
                Tiempo estimado de respuesta
              </h4>
              <p style="color: #fe6b24; margin: 0 0 10px 0; font-size: 20px; font-weight: bold;">
                24-48 horas
              </p>
              <p style="color: #a3a3a3; margin: 0; font-size: 14px; line-height: 1.5;">
                Recibirás el email con las instrucciones de pago en tu bandeja de entrada
              </p>
            </div>

            <div style="background: #141414; border: 1px solid #262626; border-radius: 8px; padding: 20px; text-align: center;">
              <p style="color: #d4d4d4; margin: 0 0 10px 0; font-size: 14px;">
                ¿Tienes preguntas mientras tanto?
              </p>
              <p style="color: #a3a3a3; margin: 0; font-size: 13px; line-height: 1.6;">
                Puedes responder directamente a este email o contactarnos.<br/>
                <strong style="color: #fe6b24;">Estamos aquí para ayudarte </strong>
              </p>
            </div>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, error };
  }
}

export async function addToNewsletter(email: string): Promise<EmailResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Meta Gym <noreply@brandondev.me>', 
      to: [email],
      subject: 'Confirmación de suscripción - Meta Gym Newsletter',
      html: `
      <div style="background-color: #0e0e10; color: #fefefe; padding: 40px; font-family: Arial, sans-serif;">
        <div style="max-width: 500px; margin: 0 auto;">
        
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #e04a36, #fe6b24); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
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
        </div>
      </div>
      `
    });

    if (error) {
      console.error('Error sending newsletter confirmation:', error);
      return { success: false, error };
    }

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
    const { data, error } = await resend.emails.send({
      from: 'Meta Gym Contact <contact@brandondev.me>', 
      to: ['brandoncarrilloalvarez2@gmail.com'], 
      subject: `Nuevo mensaje de contacto - ${name}`,
      html: `
        <div style="background-color: #0e0e10; color: #fefefe; padding: 40px; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto;">
            
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #e04a36, #fe6b24); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
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

    return { success: true, data };
  } catch (error) {
    console.error('Error en servicio de contacto:', error);
    return { success: false, error };
  }
}