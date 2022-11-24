import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

let tempo = null;
let milissegundo = 0;
let segundo = 0;
let minuto = 0;

export default function App() {
  const [numero, setNumero] = useState('00:00:00');
  const [botao, setBotao] = useState('INICIAR');
  const [ultimo, setUltimo] = useState(null);

  function vai(){
    if(tempo !== null){
      clearInterval(tempo);
      tempo = null;
      setBotao('CONTINUAR');

    } else{
      tempo = setInterval(()=>{
        milissegundo ++;

        if(milissegundo == 60){
          milissegundo = 0;
          segundo++;
        }

        if(segundo == 60){
          segundo = 0;
          minuto++;
        }

        let tempoFormatado = 
        (minuto < 10 ? '0' + minuto : minuto) + ':' + 
        (segundo < 10 ? '0' + segundo : segundo) + ':' + 
        (milissegundo < 10 ? '0' + milissegundo : milissegundo );

        setNumero(tempoFormatado);

      }, 10);
      
      setBotao('PAUSAR');
    }
  }

  function limpar(){
    if(tempo !== null){
      clearInterval(tempo);
      tempo = null;
    }

    setUltimo(numero);
    setNumero('00:00:00');
    milissegundo = 0;
    segundo = 0;
    minuto = 0;
    setBotao('INICIAR');
  }

 return (
   <View style={styles.container}>
    <Image source={require('./src/crono.png')} />

    <Text style={styles.tempo}> 
      {numero}
    </Text>

    <View style={styles.btnArea}>
      <TouchableOpacity 
        style={styles.btn} 
        onPress={vai}
      >
        <Text style={styles.btnTexto}> 
          {botao} 
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.btn} 
        onPress={limpar}
      >
        <Text style={styles.btnTexto}>
          ZERAR
        </Text>
      </TouchableOpacity>
    </View>

    <View style={styles.areaUltima}>
      <Text style={styles.textoCorrida}>
        {ultimo ? 'Último tempo: ' + ultimo : ''}
      </Text>
    </View>

   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#121212'
  },
  tempo:{
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFF'
  },
  btnArea:{
    flexDirection:  'row',
    marginTop: 130,
    height: 40,
  },
  btn:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 9
  },
  btnTexto:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#121212'
  },
  areaUltima:{
   marginTop: 40, 
  },
  textoCorrida:{
    fontSize: 23,
    color: '#FFF',
    fontStyle: 'italic'
  }
});
