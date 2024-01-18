/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,  { useState } from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput, TouchableOpacity, Alert
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [clientName, setClientName] = useState('');
  const [clientNoHp, setClientNoHp] = useState('');
  const [email, setEmail] = useState('');
  const [problem, setProblem] = useState('');
  const [selectedLokasi, setSelectedLokasi] = useState('');
  const [selectedDepartemen, setSelectedDepartemen] = useState('');
  //state validation
  const [errors, setErrors] = useState([]);

  // Function to insert data
  const insertData = async () => {  
      try {
          const apiUrl = 'https://helpdesk.armadahadagraha.com/api/tiket'; // Replace with your API endpoint
      
          const newData = {
            client_name: clientName,
            client_no_hp: clientNoHp,
            email: email,
            problem: problem,
            id_lokasi: selectedLokasi,
            id_departemen: selectedDepartemen,
          };
      
          const response = await axios.post(apiUrl, newData, {
            headers: {
              'Content-Type': 'application/json',
              // Add any other headers if required, like authorization headers
            },
          });
      
          console.log('Data inserted successfully:', response.data);
          // Handle successful insertion here
          Alert.alert(
              'Tiket Berhasil dibuat silahkan cek email anda !', // Message body of the alert// Prevents dismissing the alert by tapping outside
            );
            setProblem('');
        } catch (error) {
          //set errors response to state "errors"
          setErrors(error.response.data);
          // Handle error while inserting data
        }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <View style={styles.header}>
          <Text style={styles.logo}>IT-Helpdesk AHG</Text>
        </View>
        <View style={styles.separator}></View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nama"
            value={clientName}
            onChangeText={text => setClientName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="No HP"
            value={clientNoHp}
            onChangeText={text => setClientNoHp(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address" // Hanya menerima input dalam format email
            autoCapitalize="none" // Tidak mengubah huruf menjadi huruf besar otomatis
          />
          <Picker
            selectedValue={selectedLokasi}
            onValueChange={(itemValue, itemIndex) => setSelectedLokasi(itemValue)}
            style={styles.picker}
            placeholder='Pilih Lokasi'
          >
            <Picker.Item label="Pilih Lokasi" value="" />
            <Picker.Item label="Head Office" value="Head Office" />
            <Picker.Item label="Semarang" value="Semarang" />
          </Picker>
          <Picker
            selectedValue={selectedDepartemen}
            onValueChange={(itemValue, itemIndex) => setSelectedDepartemen(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Pilih Departemen" value="" />
            <Picker.Item label="IT" value="IT" />
            <Picker.Item label="HRD & GA" value="HRD & GA" />
            <Picker.Item label="Legal" value="Legal" />
            <Picker.Item label="Procurement" value="Procurement" />
            <Picker.Item label="Finance" value="Finance" />
            <Picker.Item label="Accounting" value="Accounting" />
            <Picker.Item label="Bidding" value="Bidding" />
            <Picker.Item label="PPIC" value="PPIC" />
            <Picker.Item label="Proyek" value="Proyek" />
          </Picker>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Informasikan Masalah Anda secara detail!"
            multiline
            value={problem}
            onChangeText={text => setProblem(text)}
          />
          <TouchableOpacity style={styles.button} onPress={insertData}>
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            setClientName('');
            setEmail('');
            setClientNoHp('');
            setProblem('');
            setSelectedLokasi('')
            setSelectedDepartemen('')
          }}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    // borderWidth: 8,
    // borderColor: 'red', // Warna border bisa disesuaikan
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    // borderWidth: 8,
    // borderColor: 'green', // Warna border bisa disesuaikan
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  formContainer: {
    
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  picker: {
    height: 40,
    backgroundColor: '#dbd8d0',
    borderColor: 'red',
    borderWidth: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  separator: {
    borderBottomWidth: 5,
    borderBottomColor: 'red',
    marginBottom: 30,
  },
});
export default App;
