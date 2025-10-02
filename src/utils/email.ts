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
      from: 'Meta Gym <onboarding@brandondev.me>', // ← Tu dominio verificado
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
      from: 'Meta Gym <noreply@brandondev.me>', // ← Tu dominio verificado
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
      from: 'Meta Gym Contact <contact@brandondev.me>', // ← Tu dominio verificado
      to: ['brandoncarrilloalvarez2@gmail.com'], // Tu email para recibir contactos
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